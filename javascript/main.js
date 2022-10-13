const Main={
    init:function()
    {
        this.cacheSelectors();
        this.bindEvents();
        this.createTime();
    },
    cacheSelectors:function()
    {
        /*Campos*/
        this.$name=document.querySelector("#name");
        this.$monthyFees=document.querySelector("#monthyFees");
        this.$interestRates=document.querySelector("#interestRates");
        this.$time=document.querySelector("#time");
        this.$buttonForm=document.querySelector("#buttonForm");
        /*-------*/
        this.$buttonRefresh=document.querySelector("#buttonRefresh");
        this.$formCiclic=document.querySelector("#formCiclic");
        this.$main=document.querySelector("#main");
        this.$errorMensages=document.querySelectorAll(".erroMensage");
    },
    createTime:function()
    {
        for(let i=0;i<24;i++){
            this.$time.innerHTML+=`<option value="${i+1}">${i+1} ano</option>`
        }
    },
    resultContent:function(res){
        let result=parseFloat(res.result).toFixed(2);
        return `
        <div class="resultado">
            <article>
                <h2>Olá <span>${this.$name.value}</span>!</h2>
                <p>
                    Juntando <span>R$ ${this.$monthyFees.value}</span> todo mês, 
                    você terá <span>R$ ${result}</span> em <span>${this.$time.value} anos</span>
                    sob uma taxa de juros de <span>${this.$interestRates.value}%</span> ao mês.
                </p>
            </article>
            <button onClick="window.location.reload()">Simular Novamente</button>
        </div>
        `
    },
    changeContent:function(result)
    {
        this.$formCiclic.remove();
        this.$main.innerHTML+=this.resultContent(result);
    },
    bindEvents:function()
    {
        const self=this;
        this.$buttonForm.onclick=self.Events.onclick_Simulated.bind(self);
    },
    jsonDataConversor:function (response) {
        return response.json();
    },
    Events:{
        onclick_Simulated:function(e)
        {
            let missingInput=false;
            const self=this;
            let _interestRates=parseFloat(this.$interestRates.value.replace(',','.'))/100;
            e.preventDefault();
            if(this.$name.value=="")
            {
                this.$errorMensages[0].classList.remove("hidden");
                this.$name.parentElement.classList.add("border");
                missingInput=true;
            }
            else{
                this.$errorMensages[0].classList.add("hidden");
                this.$name.parentElement.classList.remove("border");
            }
            if(this.$monthyFees.value=="")
            {
                this.$errorMensages[1].classList.remove("hidden");
                this.$monthyFees.parentElement.classList.add("border");
                missingInput=true;
            }
            else{
                this.$errorMensages[1].classList.add("hidden");
                this.$monthyFees.parentElement.classList.remove("border");
            }
            if(this.$interestRates.value=="")
            {
                this.$errorMensages[2].classList.remove("hidden");
                this.$interestRates.parentElement.classList.add("border");
                missingInput=true;
            }
            else{
                this.$errorMensages[2].classList.add("hidden");
                this.$interestRates.parentElement.classList.remove("border");
            }
            if(this.$time.value=="")
            {
                this.$errorMensages[3].classList.remove("hidden");
                this.$time.parentElement.classList.add("border");
                missingInput=true;
            }
            else{
                this.$errorMensages[3].classList.add("hidden");
                this.$time.parentElement.classList.remove("border");
            }
            if(missingInput)
                return;
            fetch("http://api.mathjs.org/v4/",{
                method:"POST",
                body: JSON.stringify(
                        { 
                            "expr": `${this.$monthyFees.value} * (((1 + ${_interestRates}) ^ ${this.$time.value} - 1) / ${_interestRates})` 
                        }
                    )
            })
            .then(this.jsonDataConversor)
            .then(this.changeContent.bind(self));
        }
    }
}
Main.init();