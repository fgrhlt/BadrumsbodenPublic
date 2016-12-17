import React, { Component } from 'react'
import Header from '../../components/services/Header'
import Footer from '../../components/services/Footer'
require('styles/_webshopPage/faq.css')

export default class Faq extends Component {
  handleClick(e) {
    let infoDiv = e.target.parentNode.childNodes[2]
    let figure = e.target.parentNode.childNodes[1]
    if(infoDiv.style.display == "" || infoDiv.style.display == "none") {
      infoDiv.style.display = "block";
      figure.style.transform = "rotate(180deg)"
    }
    else {
      infoDiv.style.display = "none";
      figure.style.transform = "rotate(0)"
    }
  }
  render() {
    window.scrollTo(0, 0);
    return (
      <div>
        <Header/>
        <div id="infoBank">
          <h1>Informationsbank</h1>
          <div>
            <h2 onClick={this.handleClick.bind(this)}>Vanliga frågor</h2>
            <figure />
            <div className="info">
              <h4>Har ni en fysisk butik?</h4>
              <p>
                I vår butik på Västerslätt, Kabelvägen 8 (E4 västra länken),
                hittar du en utställning med badrumsmöbler, kakel och klinker,
                våtrumsmatta och våtrumsskivor.
                Här kan du se och känna på produkter för att få inspiration.<br/>
                <br />
                <span>Öppettider:</span><br/>
                Vardagar: 11.00 - 17.00<br/>
                Lördagar: 11.00 - 14.00<br/><br/>
                Under 1/12 - 31/3 är butiken stängd lördagar
              </p>
            </div>
          </div>

          <div>
            <h2 onClick={this.handleClick.bind(this)}>Betalning</h2>
            <figure />
            <div className="info">
              <p>
              Hos Badrumsboden.se kan du välja ett flertal sätt att betala dina varor eller tjänster.<br/><br/>
              </p>
            </div>
          </div>

          <div>
            <h2 onClick={this.handleClick.bind(this)}>Frakt och leverans</h2>
            <figure />
            <div className="info">
              <h4>Frakt</h4>
              <ul>
                <li>Vid köp av varor över 1 000 kr erbjuder vi fri frakt</li>
                <li>Under 1 000 kr tillkommer en fraktavgift på 190 kr</li>
                <li>Vid avhämtning i butik utgår inga fraktkostnader</li>
              </ul>

              <h4>Leverans</h4>
              <ul>
                <li>Leveranser sker med DHL, Schenker eller Posten Paket. Andra transportföretag kan förekomma.</li>
                <li>Leveranstider kan variera beroende på om det är en lagervara eller om leveransen sker direkt från leverantören.</li>
                <li>Lagervaror levereras från oss en till två dagar efter att order/betalning har kommit till oss.</li>
                <li>Leveranstid från leverantören framgår av orderbekräftelsen.</li>
                <li>Mindre paket sänds vanligtvis som postpaket och avhämtas på det lokala postutlämningsstället.</li>
                <li>Större leveranser skickas normalt på pall. Denna försändelse aviseras en dag (i vissa fall samma dag) före leverans. I det fall Ni inte är hemma vid leveransen tar fraktfirman varorna i retur och de kan då avhämtas på godsterminalen.</li>
                <li>Vid leverans med budbil levereras produkterna till första dörren på bottenvåningen.</li>
                <li>Vid leverans i flera omgångar, beroende på olika leveranstider mm, betalas ej ytterligare leveranskostnader.</li>
                <li>Vi reserverar oss för varor som kan vara slut i lager eller som har utgått ur sortimentet. Skulle så vara fallet kommer vi meddela detta så snart som möjligt, Badrumsboden.se kan ej hållas ansvarig för eventuella kostnader för t ex installatör vid förseningar. Ej heller för fellevererade eller defekta varor.</li>
                <li>Vid försening har kunden rätt att häva köpet.</li>
                <li>Vid leveranser till orter på svårframkommliga ställen är det ej garanterat att leverans kan ske fram till dörren.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 onClick={this.handleClick.bind(this)}>Priskalkyl</h2>
            <figure />
            <div className="info">
              <p>
                Med en priskalkyl kan du snabbt få ett svar på hur mycket en badrumsrenovering kommer att kosta.
                OBS! Det behöver ej vara en badrumsrenovering med kakel och klinker utan det går lika bra med
                våtrumsmatta eller våtrumsskivor. VVS-arbetet ingår också. <br/>

                Det kan även vara någon annan tjänst du vill få utförd, t ex byte av parkettgolv,
                plastmatta eller sättning av kökskakel.
                Fyll bara i formuläret om vad det är för typ av tjänst du vill köpa så kommer en kalkyl.
                Du får svar inom en arbetsdag om inte sjukdom eller annat hindrar.<br/>

                Kalkylen är ej ett fast pris utan en uppskattning som görs efter de uppgifter du har lämnat.
                Tycker du att kalkylen är intressant går vi vidare med ett hembesök,
                därefter får du en offert där du får ett fast pris för arbetet.
                För att priset skall vara så nära verkligheten som möjligt

                är det viktigt att du fyller i alla uppgifter så noggrant det går.<br/>
                Det är många frågor att besvara men tänk då på att en
                badrumsrenovering både är ett stort ingrepp i fastigheten
                och en stor investering så det är bra om allt blir rätt på en gång.

                Det är dessutom många regler som styr både renovering och VVS-arbetet.<br/>
              </p>
            </div>
          </div>

          <div>
            <h2 onClick={this.handleClick.bind(this)}>Retur och ångerrätt</h2>
            <figure />
            <div className="info">
              <h4>Ångerrätt</h4>
              <p>
                OBS! Specialbeställda, måttbeställda produkter är det ingen returrätt på.<br/><br/>
                För privatpersoner tillämpar Badrumsboden.se Distans- och Hemförsäljningslagen samt Konsumentköplagen. Enligt Distans- och Hemförsäljningslagen har kunden alltid rätt att ångra sitt köp inom 14 dagar från mottagandet av varan och utan att behöva uppge någon speciell anledning.<br/><br/>
                Retur efter 14 dagar är möjligt mot en returavgift. Avgiften brukar ligga på 40% - 50% av ordervärdet. Lägg märke till att detta inte gäller specialbeställda produkter.<br/><br/>
                Vid åberopande av ångerrätt och öppet köp står du som kund för returfrakten och eventuella returskador dvs om produkten skadas eller kommer bort under frakt. Ångerrätt och öppet köp 14 dagar gäller endast privatpersoner.
              </p>

              <h4>Returer</h4>
              Vid åberopande av ångerrätt / öppetköp gäller följande:
              <ul>
                <li>Vi rekommenderar att returen meddelas till Badrumsboden.se</li>
                <li>Produkten skall vara i väsentligt oförändrat skick dvs oanvänd och utan skador</li>
                <li>Produkten skall returneras i sin ursprungliga förpackning eller emballage</li>
                <li>Produkten skall vara komplett vilket innebär att delar av produkten inte accepteras som retur</li>
                <li>Returer som skickas mot efterkrav/postförskott löses ej ut</li>
                <li>Kunden står alltid för skador som kan uppstå under transporten</li>
                <li>När kunden lagt sin beställning samtycker kunden till att Badrumsboden.se påbörjar fullgörandet av beställningen. Detta innebär att kunden inte har någon ångerrätt från och med den tidpunkt när produkter som tillverkas efter beställning och därmed ej finns på lager hos våra leverantörer har påbörjats i produktion</li>
              </ul>

              <h4>Återbetalning</h4>
              <p>
                I de fall återbetalningar är aktuella så görs detta i första hand genom återinsättning på kontokort/ bankkonto eller till ett av dig angivet bankkonto. Återbetalningen sker inom några dagar från det att ärendet som orsakar återbetalningen är avslutat.
              </p>
            </div>
          </div>

          <div>
            <h2 onClick={this.handleClick.bind(this)}>Garanti och reklamation</h2>
            <figure />
            <div className="info">
              <p>
              Badrumsboden.se tillämpar konsumentköplagen vid alla fall av reklamationer
              dvs. minst 1 års garanti samt 3 års reklamationsrätt.
              En del av våra leverantörer har längre garanti än 1 år.
              Du kan kontakta kundtjänst för aktuell garanti för produkten du vill beställa.<br/><br/>

              Vid fel som täcks av garantin byter vi ut varan eller vid behov skickar ut en reparatör för besiktning och reparation.
              I sådana fall står Badrumsboden.se för kostnader som kan uppkomma
              i samband med retur och leverans av ersättningsprodukt.<br/><br/>

              Om en reparatör skickas ut i anmälda garantiärenden och inga fel
              kan konstateras debiteras kunden för eventuella kostnader.
              Detta gäller även i de fall kunden orsakat skadan själv som vid t.ex
              felmontering eller handhavandefel.<br/><br/>

              Vid eventuellt produktfel skall reklamationen göras före
              montering av produkten.
              </p>
            </div>
          </div>

          <div>
            <h2 onClick={this.handleClick.bind(this)}>Cookies</h2>
            <figure />
            <div className="info">
              <p>
                Den 1 juli 2011 ändras lagen om elektronisk kommunikation (LEK) på en rad punkter<br />
                <a href="http://www.pts.se/sv/Bransch/Regler/Lagar/Lag-om-elektronisk-kommunikation/Nyheter-for-konsumenter-fran-1-juli-2011/" target="_blank">
                Läs mer om lagen om elektronisk kommunikation
                </a>
                <br /><br/>

                Enligt lag om elektronisk kommunikation, som trädde i kraft den 25 juli 2003,
                ska alla som besöker en webbplats informeras om vad cookies används
                till och ges möjlighet att vägra sådan användning.<br/>
                <a href="http://www.notisum.se/rnp/sls/lag/20030389.htm" target="_blank">(SFS 2003:389)</a>
              </p><br/>

              <p>
                Vi använder cookies till att lagra information om kundvagnen som finns
                i vår webbshop.<br/> Dessa är session-cookies och går ut efter en viss tid.<br /><br/>

                Genom att använda vår hemsida godkänner du användandet av cookies.
              </p>
            </div>
          </div>

          <div>
            <h2 onClick={this.handleClick.bind(this)}>Tryckfel</h2>
            <figure />
            <div className="info">
              <p>
                Vi reserverar oss för eventuella tryck- och skrivfel. <br/><br/>
                Vid prisjusteringar på lagd beställning så informeras du alltid om detta och har då din fulla rätt att ändra eller annullera din beställning.
              </p>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
