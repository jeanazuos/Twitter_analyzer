var tweet = [];
var listaConteudo = [];
var corpo;
var corpoCarregaMais;
var periodoMsg;

//--- Conta os tweets e popula um objeto para ser salvo no excel, sendo chamado no metodo saveFile()
window.mappingTweet = function mappingTweet(mesagemExtra) {

    corpo = document.querySelector('iframe').contentDocument.querySelector('body').querySelector('.timeline-TweetList')
    listaConteudo = corpo.querySelectorAll(".timeline-TweetList-tweet.customisable-border")

    for (var i = 0; i < listaConteudo.length; i++) {

        tweet[i] = {
            tempo: listaConteudo[i].querySelector(".timeline-Tweet-timestamp").textContent.trim(),
            autor: listaConteudo[i].querySelector(".TweetAuthor-screenName.Identity-screenName").textContent,
            conteudo: listaConteudo[i].querySelector(".timeline-Tweet-text").textContent,
        }

    }
    periodoMsg = "Foram encontrados " + listaConteudo.length + " tweets entre: " + tweet[0].tempo + " e " + tweet[listaConteudo.length - 1].tempo
    if (mesagemExtra) {
        alert(periodoMsg + " " + mesagemExtra)
    }
    else {
        alert(periodoMsg)

    }
}

//--- Salva em formato excel

window.saveFile = function saveFile() {
    mappingTweet("Clique em [ OK ] para realizar o download")
    var opts = [{ sheetid: 'Sheet One', header: true }];
    var result = alasql('SELECT * INTO XLSX("Relatorio_twitter.xlsx",?) FROM ?',
        [opts, [tweet]]);
}

//--- Carrega mais conteudo

window.loadMoreTweets = function loadMoreTweets() {
    corpoCarregaMais = document.querySelector('iframe').contentDocument.querySelector('body').querySelector('.timeline-LoadMore-prompt')
    corpoCarregaMais.click();

}

window.validateMyForm = function validateMyForm(parametros){
    window.location = "twitter_parsing_v3.html?" + parametros
}

window.pegaParametro = function pegaParametro(){
    const url_string = window.location.href
    const url_object = new URL(url_string);
    const pagina = url_object.searchParams.get("pagina");
    return pagina
}