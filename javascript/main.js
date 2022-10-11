const Main={
    init:function()
    {
        this.cacheSelectors();
        this.bindEvents();
        this.createTime();
    },
    cacheSelectors:function()
    {
        this.$name=document.querySelector("#name");
        this.$monthyFees=document.querySelector("#monthyFees");
        this.$interestRates=document.querySelector("#interestRates");
        this.$time=document.querySelector("#time");
        this.$buttonForm=document.querySelector("#buttonForm");
        this.$formCiclic=document.querySelector("#formCiclic");
        this.$main=document.querySelector("#main");
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
                <h2>Olá ${this.$name.value}!</h2>
                <p>
                    Juntando R$ ${this.$monthyFees.value} todo mês, 
                    você terá R$ ${result} em ${this.$time.value} anos
                    sob uma taxa de juros de ${this.$interestRates.value}% ao mês.
                </p>
            </article>
            <button>Simular Novamente</button>
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
            e.preventDefault();
            const self=this;
            let _interestRates=parseFloat(this.$interestRates.value)/100;
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