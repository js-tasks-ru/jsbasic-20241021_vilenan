let calculator = {
    read() {
      this.a = +prompt('Введите a', 0);
      this.b = +prompt('Введите b', 0);
    },
    sum() {
      return this.a + this.b;
    },
    mul(){
      return this.a * this.b;
    },
  };

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
