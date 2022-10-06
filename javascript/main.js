const Main={
    init:function()
    {
        this.cacheSelectors;
    },
    cacheSelectors:function()
    {
        this.$name=document.querySelector("#name");
        this.$monthyFees=document.querySelector("#monthyFees");
        this.$interestRates=document.querySelector("#interestRates");
        this.$time=document.querySelector("#time");
    },
    result:function(res){
        return `
        <div class="resultado">
            <article>
                <h2>Olá ${this.$name}!</h2>
                <p>
                    Juntando R$ ${this.$monthyFees} todo mês, 
                    você terá R$ ${res} em ${this.$time} anos
                    sob uma taxa de juros de ${this.$interestRates} ao mês.
                </p>
            </article>
            <button>Simular Novamente</button>
        </div>
        `
    },
    bindEvents:function()
    {
        const self=this;
    },
    Events:{

    }
}
Main.init();