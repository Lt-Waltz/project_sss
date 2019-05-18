# project_sss
Websivu käynnistetään ajamalla index.php tiedosto. Ennen kuin varsinaiseen sivustoon pääsee käsiksi vaatii ohjelma käyttäjältä tunnuksen luomisen joka tallennetaan tietokantaan. Ohjelma vaatii kyseisen tietokannan toimiakseen oikein. Tietokannan luontikomennot: 
create database authentication;
use authentication;
create table users (
    id int not null primary key auto_increment,
    username varchar(50) not null unique,
    password varchar(255) not null,
    created_at datetime default current_timestamp
    );
    
#Uudet ominaisuudet
Uusina ominaisuuksina lisäsimme sivulle toimivat tunnuksen luomis- ja kirjautumismahdollisuudet, sekä pelien hakemisen aakkosjärjesyksen lisäksi sekä hinnan, alennusprosentin, että alennusmäärän mukaan.

#HTTP-kutsut
Käytimme tunnusten hallinnassa HTTP:n metodia $_POST kirjoittamalla sen avulla piilotettuja salasanoja tietokantaan. Kirjatumisen tunnistamisen teimme $_SESSION metodilla, johon tallentuu sisäänkirjautuneen käyttäjän tiedot myös kun selain suljetaan ja avataan uudelleen. Käytämme myös Steam:in Web API:tä. Komennot joita käytämme ovat:
                                                                                                                                                                                                                                                                                -https://api.steampowered.com/ISteamApps/GetAppList/v2/ : Antaa listan Steamin kaikista peleistä JSON muodossa.
                                                                                                                                                                                                                                                                                -https://store.steampowered.com/api/appdetails?appids=391540 : Antaa tarkempaa tietoa tietystä pelistä JSON muodossa.
#Mitä vielä lisäisimme?
Ajan loppuessa kesken jouduimme karsimaan pois muutaman ominaisuuden lopullisesta projektista. Pois jäi käyttäjäkohtainen suosikit-lista, johon käyttäjä olisi pystynyt pelejä valikoimaan ja tallentamaan. Myös osa pelilistan järjestämismekanismista jäi kesken. Jos haku on tehty ja lista peleistä on latautunut sivulle, olisi listan järjestystä voinut vaihtaa "hinnan", "alennuksen", jne. mukaan, mutta aika loppui ja se jäi kesken. 
                                                                                                                                                                                                            Pelit pystyy kuitenkin järjestää "hinnan" yms. mukaan, jos sen valinnan tekee ennen pelien hakua.
 
 