import sqlite3
from flask import Flask, render_template, request, redirect, url_for, session, flash
from threading import Timer
import webbrowser

app = Flask(__name__)
app.secret_key = "tsss"


def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    # Таблица пользователей
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            t1 INTEGER DEFAULT 0,
            t2 INTEGER DEFAULT 0,
            t3 INTEGER DEFAULT 0,
            t4 INTEGER DEFAULT 0,
            t5 INTEGER DEFAULT 0,
            t6 INTEGER DEFAULT 0,
            t7 INTEGER DEFAULT 0,
            t8 INTEGER DEFAULT 0,
            t9 INTEGER DEFAULT 0
        )
    """
    )
    # Таблица пройденных тем (теория)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS completed_tenses (
            user_id INTEGER,
            tense_name TEXT,
            PRIMARY KEY (user_id, tense_name)
        )
    """
    )
    # Таблица пройденных тестов
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS completed_tests (
            user_id INTEGER,
            test_name TEXT,
            PRIMARY KEY (user_id, test_name)
        )
    """
    )
    conn.close()


# Соответствие тестов и полей счётчиков
TEST_TO_COUNTER = {
    "prSimple": "t5",
    "paSimple": "t5",
    "fuSimple": "t5",
    "prContinuous": "t6",
    "paContinuous": "t6",
    "fuContinuous": "t6",
    "prPerfect": "t7",
    "paPerfect": "t7",
    "fuPerfect": "t7",
    "prPC": "t8",
    "paPC": "t8",
    "fuPC": "t8",
}

# Соответствие тем и полей (для теории)
TENSE_TO_COUNTER = {
    "prSimple": "t1",
    "paSimple": "t1",
    "fuSimple": "t1",
    "prContinuous": "t2",
    "paContinuous": "t2",
    "fuContinuous": "t2",
    "prPerfect": "t3",
    "paPerfect": "t3",
    "fuPerfect": "t3",
    "prPC": "t4",
    "paPC": "t4",
    "fuPC": "t4",
}


# Маршруты (остаются без изменений)
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/rules")
def rules():
    return render_template("rules.html")


@app.route("/tests")
def tests():
    return render_template("tests.html")


@app.route("/lk")
def lk():
    if "user" in session:
        conn = get_db_connection()
        user = conn.execute(
            "SELECT * FROM users WHERE login = ?", (session["user"],)
        ).fetchone()
        conn.close()
        if user:
            return render_template("lk.html", user=user)
    return render_template("lk.html")


@app.route("/lk/login", methods=["POST"])
def lk_login():
    login = request.form["login"]
    password = request.form["password"]
    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE login = ? AND password = ?", (login, password)
    ).fetchone()
    conn.close()
    if user:
        session["user"] = login
    else:
        flash("Пользователь не существует или неверный пароль", "error")
    return redirect(url_for("lk"))


@app.route("/lk/register", methods=["POST"])
def lk_register():
    login = request.form["login"]
    password = request.form["password"]
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO users (login, password) VALUES (?, ?)", (login, password)
        )
        conn.commit()
        session["user"] = login
        flash("Регистрация прошла успешно", "success")
    except sqlite3.IntegrityError:
        flash("Логин уже занят", "error")
    finally:
        conn.close()
    return redirect(url_for("lk"))


@app.route("/lk/logout")
def lk_logout():
    session.pop("user", None)
    return redirect(url_for("lk"))


@app.route("/tenses/<tense_name>")
def show_tense(tense_name):
    return render_template(f"tenses/{tense_name}.html")


@app.route("/tests/<test_name>")
def show_test(test_name):
    return render_template(f"tests/{test_name}.html")


# Обработка завершения теории
@app.route("/complete_tense/<tense_name>", methods=["POST"])
def complete_tense(tense_name):
    if "user" not in session:
        return redirect(url_for("lk"))
    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE login = ?", (session["user"],)
    ).fetchone()
    if not user:
        conn.close()
        return redirect(url_for("rules"))
    user_id = user["id"]
    existing = conn.execute(
        "SELECT * FROM completed_tenses WHERE user_id = ? AND tense_name = ?",
        (user_id, tense_name),
    ).fetchone()
    if not existing:
        conn.execute(
            "INSERT INTO completed_tenses (user_id, tense_name) VALUES (?, ?)",
            (user_id, tense_name),
        )
        if tense_name in TENSE_TO_COUNTER:
            counter_field = TENSE_TO_COUNTER[tense_name]
            conn.execute(
                f"UPDATE users SET {counter_field} = {counter_field} + 1 WHERE id = ?",
                (user_id,),
            )
        conn.commit()
    conn.close()
    return redirect(url_for("rules"))


# Обработка завершения теста
@app.route("/complete_test/<test_name>", methods=["POST"])
def complete_test(test_name):
    if "user" not in session:
        flash("Войдите, чтобы сохранить результат", "error")
        return redirect(url_for("tests"))

    score = int(request.form.get("score", 0))
    threshold = 15  # необходимо набрать не менее 15 правильных ответов (из 20)

    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE login = ?", (session["user"],)
    ).fetchone()
    if not user:
        conn.close()
        return redirect(url_for("tests"))

    user_id = user["id"]
    existing = conn.execute(
        "SELECT * FROM completed_tests WHERE user_id = ? AND test_name = ?",
        (user_id, test_name),
    ).fetchone()

    if not existing and score >= threshold:
        conn.execute(
            "INSERT INTO completed_tests (user_id, test_name) VALUES (?, ?)",
            (user_id, test_name),
        )
        if test_name in TEST_TO_COUNTER:
            counter_field = TEST_TO_COUNTER[test_name]
            conn.execute(
                f"UPDATE users SET {counter_field} = {counter_field} + 1 WHERE id = ?",
                (user_id,),
            )
        conn.commit()
        flash("Результат сохранён! Ачивка получена.", "success")
    elif score < threshold:
        flash(
            f"Набрано недостаточно правильных ответов (нужно минимум {threshold})",
            "info",
        )
    else:
        flash("Этот тест уже был пройден", "info")

    conn.close()
    flash(f"Вы набрали {score} из 20 правильных ответов", "score")
    return redirect(url_for("tests"))


if __name__ == "__main__":
    Timer(1, webbrowser.open_new("http://127.0.0.1:5000/")).start()
    init_db()
    app.run(debug=True)
