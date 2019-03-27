# Zadání

Souvisejíci návody:

- [uuApp Server Project (NodeJs)](https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-2590bf997d264d959b9d6a88ee1d0ff5/book/page?code=uuAppStyleGuide_00)
- [uuApp Client Project (UU5)](https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-e884539c8511447a977c7ff070e7f2cf/book/page?code=89628511)

# 0. Příprava projektu

## 0.1 Nástroje

- [Git](https://git-scm.com/)
Stáhnout a nainstalovat.
- Nastavit informace o uživateli: 
```git
git config --global user.name "Jmeno Prijmeni"
git config --global user.email "Email"
```
- [MongoDB](https://www.mongodb.com/download-center/community)
Stáhnout a nainstalovat MongoDB.
- Na disku kde se nainstalovalo MongoDB vytvořte složky data/db:
```cmd
C:\ md data
```
```cmd
C:\ cd data
```
```cmd
C:\data md db
```

- Spustit MongoDB. V složce MongoDB\Server\<verze MongoDB>\bin
```cmd
mongod
```

- Stáhnout a nainstalovat REST client, napr. [Insomnia](https://insomnia.rest/download/).

## 0.2 Repozitář

Pomoci nástroje git příkazem clone, převezměte repozitář:
```git
git clone https://github.com/SWFA1/test_cities_maing01.git
```

Vytvořte si vlastní větev. Na základe předpisu candidate/mrkvicka.jozko :
```git
git checkout -b cadidate/<příjmení.jméno>
```

Pushnite svou novou větev "cadidate/<příjmení.jméno>":
```git
git push origin cadidate/<příjmení.jméno>
```
## 0.3 Klient
```cmd
cd test_cities_maing01-server
```
```cmd
npm install
```
```cmd
npm start
```

## 0.4 Server
```cmd
cd test_cities_maing01-server
```
```cmd
npm install
```
```cmd
npm start
```

## 0.5 Inicializace projektu

Pomoci REST klienta spustit nasledujíci requesty:
```http request
http://localhost:8080/test-cities-maing01/00000000000000000000000000000000-11111111111111111111111111111111/sys/initApp
{ 
  "runtimeMode": {
    "mode": "standard"   
  }
}
```
```http request
http://localhost:8080/test-cities-maing01/00000000000000000000000000000000-11111111111111111111111111111111/sys/initAppWorkspace
{
  "awid": "22222222222222222222222222222222",                            
  "awidOwner": "0-0",                       
  "licenseOwner": {                         
    "organization": {                       
      "name": "Test",                        
      "oId": "12345",                         
      "web": "http://example.org"                       
    },
    "userList": [                          
      {
        "uuIdentity": "0-0",               
        "name": "awidOwner"                       
      }
    ]
  },
  "runtimeMode": { 
    "mode": "standard"       
  }
}
```
```http request
http://localhost:8080/test-cities-maing01/00000000000000000000000000000000-22222222222222222222222222222222/init
{
  "authoritiesUri": "0-0"
}
```
# 1. Zadání - Server

## 1.1 Dokončit implementaci funkce listCities
Pro funkci modelu listCities je potřeba napsat určitou čast kódu, aby správne fungovala. 
Funkce by měla vracet získaný seznam měst. Štruktúra výstupu pro request listCities by měla vypadat:
```json
{
   "itemList": [
      {
         "name": "Prague",
         "population": 1200000,
         "country": "Czech Republic",
         "awid": "22222222222222222222222222222222",
         "grades": [],
         "averageGrade": 0,
         "sys": {
            "cts": "2019-01-26T22:46:43.651Z",
            "mts": "2019-01-26T22:46:43.651Z",
            "rev": 0
         },
         "id": "5c9aabd33cc0fa0ab08e603f"
      }
   ],
   "pageInfo": {
      "pageIndex": 0,
      "pageSize": 1000,
      "total": 1
   },
   "uuAppErrorMap": {}
}
```

**Po dokončení provést git commit:**
```git
git commit -m "T1.1 listCities"
```

## 1.2 Opravit implementaci funkce addGrade
Funkce modelu addGrade je kompletne implementovaná, avšak obsahuje nějakou chybu. Je potřeba chybu nalézt a opravit tak aby při volání requestu addGrade se správne doplnilo nové hodnocení. 
Opravený výstup by měl vypadat:
```json
{
   "name": "Prague",
   "population": 1200000,
   "country": "Czech Republic",
   "awid": "22222222222222222222222222222222",
   "grades": [
      {
         "grade": "B",
         "dateOfCreation": "2019-02-26T23:43:44.099Z"
      },
      {
         "grade": "C",
         "dateOfCreation": "2019-01-26T23:45:52.998Z"
      }
   ],
   "averageGrade": 0,
   "sys": {
      "cts": "2019-01-26T22:46:43.651Z",
      "mts": "2019-02-26T23:45:52.999Z",
      "rev": 3
   },
   "id": "5c9aabd33cc0fa0ab08e603f",
   "uuAppErrorMap": {}
}
```

**Po dokončení provést git commit:**
```git
git commit -m "T1.2 addGrade"
```

## 1.3 Dokončit implementaci funkce refreshAverageGrade
Funkce refreshAverageGrade je prřipravená, neobsahuje však hlavní logiku, sekce HDS4, kterou je potřeba doplnit.
1. Převést hodnocení na číselné hodnoty E=2.0 D=4.0 C=6.0 B=8.0 A=10.0
2. Filtrace násobných hodnocení. Všechna hodnocení které byly vytvořeny s rozdílem do 60 sekund se zredukují na 1 hodnocení.
2.1 Hodnocení bude mít hodnotu polovice aritmetického průměru násobných hodnocení.
2.2 Hodnocení si ponechá čas vytvoření prvního hodnocení.
3. Spracovat úpravu hodnocení na základe času vytvoření hodnocení:
3.1 Pokud bylo hodnocení vytvořeno v dnech měsíce 15,16 snížit hodnocení (grade - 1)
3.2 Pokud bylo hodnocení vytvořeno v dnech měsíce 11,12,13,14 snížit hodnocení (grade + 1)
3.3 Všechna hodnocení, která jsou starší než 30 dnů, upravit hodnocení (grade * 0.9)
3.4 Všechna hodnocení, která jsou starší než 90 dnů, upravit hodnocení (grade * 0.75)
4. Celkové hodnocení je aritmetickým průměrem upravených hodnocení na základe pravidel 1-3.  

**Po dokončení provést git commit:**
```git
git commit -m "T1.3 refreshAverageGrade"
```

# 2. Zadání - Klient

## 2.1 Vytvořit novou komponentu city-detail

## 2.2 Opravit css styl

# 3. Zadání - Extra

## 3.1 ?

## 3.2 ?
