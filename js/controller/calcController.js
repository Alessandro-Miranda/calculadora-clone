class CalcController
{
    constructor()
    {
        /*indica que o atributo é privado. Por convenção quando tiver o ._ não
        chamamos o atributo ou método diretamente*/
        this._displayCalcEl = document.querySelector("#display");
        this._timeEl = document.querySelector("#hora");
        this._dateEl = document.querySelector("#data");
        this._locale = "pt-BR";
        this.initialize();
    }
    initialize()
    {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)
    }
    setDisplayDateTime()
    {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    get displayCalc()
    {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value)
    {
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate()
    {
        return new Date();
    }
    set currentDate(date)
    {
        this._currentDate = date;
    }
    get displayTime()
    {
        return this._timeEl.innerHTML;
    }
    set displayTime(value)
    {
        return this._timeEl.innerHTML = value;
    }
    get displayDate()
    {
        return this._dateEl.innerHTML;
    }
    set displayDate(value)
    {
        return this._dateEl.innerHTML = value;
    }
}