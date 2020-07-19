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
        this._operation = [];
        this._lastNumber = '0';
        this._result = [];
        this._lastOperator = "";
        this.initialize();
        this.initButtonsEvents();
    }
    
    initialize()
    {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)
    }
    /*Função que inicializa os eventos nos botões*/
    initButtonsEvents()
    {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach(btn => {
            this.addEventListenerAll(btn, 'click drag', () => {
                let textBtn = btn.className.baseVal.replace('btn-', '');
                
                this.execBtn(textBtn);
            })
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', () => {
                btn.style.cursor = 'pointer';
            })
        })
    }
    /*Função para aplicar mais de um evento no botão*/
    addEventListenerAll(elem, events, fn)
    {
        events.split(' ').forEach( event => {
            elem.addEventListener(event, fn, false)
        })
    }
    /*Função para ações nos clicks dos botões*/
    execBtn(value)
    {
        switch(value)
        {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation(parseInt(this.lastNumber));
                this.addOperation('+');
                this.getResult(this.lastNumber, this.lastOperator);
                this.lastOperator = '+';
                this.lastNumber = 0;
                
                break;

            case 'subtracao':
                this.addOperation(parseInt(this.lastNumber));
                this.addOperation('-');
                this.getResult(this.lastNumber, this.lastOperator);
                this.lastOperator = '-';
                this.lastNumber = 0;

                break;

            case 'multiplicacao':
                this.addOperation(parseInt(this.lastNumber));
                this.addOperation('x');
                this.getResult(this.lastNumber, this.lastOperator);
                this.lastOperator = '*';
                this.lastNumber = 0;
                
                break;

            case 'divisao':
                this.addOperation(parseInt(this.lastNumber));
                this.addOperation('/');
                this.getResult(this.lastNumber, this.lastOperator);
                this.lastOperator = '/';
                this.lastNumber = 0;
                
                break;

            case 'porcento':
                if(this._operation.length == 0)
                {
                    this.displayCalc = 0;
                    this.lastNumber = 0;
                    this.lastOperator = '';
                    this.result = this.clearResult();
                }
                else
                {
                    this.getResult(this.lastNumber, '%');
                }    
                
                break;

            case 'igual':
                this.getResult(this.lastNumber, this.lastOperator);
                this.displayCalc = this.result[this.result.length - 1];
                this.lastNumber = this.result[this.result.length - 1]
                this.result = this.clearResult();
                
                break;

            case 'ponto':
                this.lastNumber += '.';
                this.displayCalc = this.lastNumber;
                
                break;

            case '0': case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
                if(this.lastNumber == 0)
                {
                    this.lastNumber = value;
                }
                else if(this._operation.length == 0 && this.lastNumber.length < 10)
                {
                    this.lastNumber += value;
                }
                else if(isNaN(this._operation[this._operation.length - 1]) && this.lastNumber.length < 10)
                {
                    this.lastNumber += value;
                }
                else
                {
                    return;
                }
                this.displayCalc = this.lastNumber;
                
                break;

            default:
                this.setError();
                
                break;
        }
    }
    /*Método para limpar tudo da calucladora*/
    clearAll()
    {
        this._operation = [];
        this.lastNumber = 0;
        this.result = [];
        this.displayCalc = this.lastNumber;
    }
    clearEntry()
    {
        this.lastNumber = 0;
        this.displayCalc = this.lastNumber;
    }
    addOperation(value)
    {
        this._operation.push(value);
    }
    setError()
    {
        this.displayCalc = "Error";
    }
    getResult(value, operator)
    {
        if(this.result.length == 0)
        {
            this.result = value;
        }
        else if(operator == '%')
        {
            this.lastNumber /= 100;
            this.addOperation(parseFloat(this.lastNumber));
            this.addOperation('*');
            this.lastOperator = '*';
            this.displayCalc = eval(this.result[this.result.length - 1] + this.lastOperator + this.lastNumber);
        }
        else
        {
            this.displayCalc = eval(this.result[this.result.length - 1] + operator + value);
            this.result = eval(this.result[this.result.length - 1] + operator + value);
        }
    }
    clearResult()
    {
        this.lastOperator = '';
        return this._result = [];
    }
    /*Seta a data e hora atual*/
    setDisplayDateTime()
    {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    /*Pega e configura os valores exibidos no display*/
    get displayCalc()
    {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value)
    {
        this._displayCalcEl.innerHTML = value;
    }
    /*Pega e atribui a data atual*/
    get currentDate()
    {
        return new Date();
    }
    set currentDate(date)
    {
        this._currentDate = date;
    }
    /*Exibe e altera a hora atual*/
    get displayTime()
    {
        return this._timeEl.innerHTML;
    }
    set displayTime(value)
    {
        return this._timeEl.innerHTML = value;
    }
    /*Exibe e altera a data atual*/
    get displayDate()
    {
        return this._dateEl.innerHTML;
    }
    set displayDate(value)
    {
        return this._dateEl.innerHTML = value;
    }
    /*Exibe e altera o último número digitado pelo usuário*/
    get lastNumber()
    {
        return this._lastNumber;
    }
    set lastNumber(value)
    {
        return this._lastNumber = value;
    }
    /*Pega e altera o resultado final das somas ao pressionar os sinais de operação*/
    get result()
    {
        return this._result;
    }
    set result(value)
    {
        return this._result.push(value);
    }
    /*Pega o ultimo operador digitado*/
    get lastOperator()
    {
        return this._lastOperator;
    }
    set lastOperator(value)
    {
        return this._lastOperator = value;
    }
}