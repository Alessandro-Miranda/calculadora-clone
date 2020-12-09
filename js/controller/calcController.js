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
        this._lastNumber = 0;
        this._result = [];
        this._lastOperator = "";
        this.initialize();
        this.initButtonsEvents();
        this.initKeyBoard();
    }
    copyToClipboard()
    {
        let input = document.createElement("input");
        input.value = this.displayCalc;
        
        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
    }
    pasteFromClipboard()
    {
        document.addEventListener("paste", e => {
            let text = e.clipboardData.getData("Text");

            this.displayCalc = !isNaN(text) ? text : 0;
        })
    }
    initialize()
    {
        this.setDisplayDateTime();
        this.pasteFromClipboard();

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
    /*Método para inicializar os eventos de teclado*/
    initKeyBoard()
    {
        document.addEventListener("keyup", e => {

            switch(e.key)
            {
                case 'Escape':
                    this.clearAll();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;
    
                case '+':
                case '-':
                case '*':
                    this.addOperation(e.key);
                    this.lastOperator = e.key;
                    this.getResult(this.lastNumber, this.lastOperator);
                    this.lastNumber = 0;
                        
                    break;
    
                case '/':
                    this.addOperation('/');
                    if(this.lastNumber != 0)
                    {
                        this.getResult(this.lastNumber, this.lastOperator);
                    }
                    this.lastOperator = '/';
                    this.lastNumber = 0;
                    break;
    
                case '%':
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
    
                case 'Enter':
                case '=':
                    this.getResult(this.lastNumber, this.lastOperator);
                    this.displayCalc = this.result[this.result.length - 1];
                        
                    break;
    
                case '.':
                case ',':
                    if(this.lastNumber == 0 && this.lastNumber.toString().length === 1)
                    {
                        this.lastNumber += '.';
                    }
                    else if(this.lastNumber.indexOf(".") === -1)
                    {
                        this.lastNumber += '.';
                    }
                    else
                    {
                        return;
                    }
                    this.displayCalc = this.lastNumber;
                        
                    break;
    
                case '0': case '1': case '2': case '3': case '4': case '5':
                case '6': case '7': case '8': case '9':
                    if(this.lastNumber === 0)
                    {
                        this.lastNumber = e.key;
                    }
                    else if(this._operation.length == 0 && this.lastNumber.length < 10)
                    {
                        this.lastNumber += e.key;
                    }
                    else if(isNaN(this._operation[this._operation.length - 1]) && this.lastNumber.length < 10)
                    {
                        this.lastNumber += e.key;
                    }
                    else
                    {
                        return;
                    }
                    this.displayCalc = this.lastNumber;
                        
                    break;
                    
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
            }
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
                this.addOperation('+');
                this.lastOperator = '+';
                this.getResult(this.lastNumber, this.lastOperator);
                this.lastNumber = 0;
                
                break;

            case 'subtracao':
                this.addOperation('-');
                this.lastOperator = '-';
                this.getResult(this.lastNumber, this.lastOperator);
                this.lastNumber = 0;

                break;

            case 'multiplicacao':
                this.addOperation('x');
                this.lastOperator = '*';
                this.getResult(this.lastNumber, this.lastOperator);
                this.lastNumber = 0;
                
                break;

            case 'divisao':
                this.addOperation('/');
                if(this.lastNumber != 0)
                {
                    this.getResult(this.lastNumber, this.lastOperator);
                }
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
                
                break;

            case 'ponto':
                if(this.lastNumber == 0 && this.lastNumber.toString().length === 1)
                {
                    this.lastNumber += '.';
                }
                else if(this.lastNumber.indexOf(".") === -1)
                {
                    this.lastNumber += '.';
                }
                else
                {
                    return;
                }
                this.displayCalc = this.lastNumber;
                
                break;

            case '0': case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
                if(this.lastNumber === 0)
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
        this._operation.length = 0;
        this.lastNumber = 0;
        this.result.length = 0;
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
            this.addOperation('*');
            this.lastOperator = '*';
            this.displayCalc = eval(this.result[this.result.length - 1] + this.lastOperator + this.lastNumber);
            this.result = eval(this.result[this.result.length - 1] + this.lastOperator + this.lastNumber);
        }
        else
        {
            if(this.lastNumber != 0)
            {
                this.result = eval(this.result[this.result.length - 1] + operator + value);
                this.addOperation(operator + value);
            }
            else if(this.lastNumber == 0)
            {
                this.displayCalc = eval(this.result[this.result.length - 1] + "" + this._operation[this._operation.length - 1]);
                this.result = eval(this.result[this.result.length - 1] + "" + this._operation[this._operation.length - 1]);
            }
            this.displayCalc = eval(this.result[this.result.length - 1] + operator + value);
        }
        this.lastNumber = 0;
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