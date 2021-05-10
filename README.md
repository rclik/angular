# Genel Giris

Bu proje angular ogrenmek icin gelistirildi.

## Angular project leri icin kullanilan komutlar

### Project in calistirilmasi

> ng serve

Bu komut, project in 4200 port u uzerinde calistirilmasini saglar. Su linke tiklayabilirsin `http://localhost:4200/`.

Istersek bu komutu geslitirebiliriz, calistirilinca uygulamanin browser uzerinde calistirilmasi icin `--open`, istedigimiz bir port da calisitirilmasini saglamak icin `--port <port>` komutlarini kullanabiliriz.

> ng serve --port 5500 --open

## Angular CLI Kullanarak Angular Elemanlarinin Olusturulmasi

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Shop

## 1- Component larin Olusturulmasi

Uygulamamizda 3 tane component olacak, onlari olusturalim;

Project dizini altinda asagidaki komutu kullanarak, product, category ve nav component larini ekleyelim;

>ng g component <component_name>

Herbir component olusuturuldugunda sunlar oluyor;

- `<component_name>` i kullanarak `app` folder i aldinda bir folder olusturuyor. (folderName -- folder-name)
- bu folder altinda `component-name.component.ts`,`component-name.component.html`, `component-name.component.spec.ts`, `component-name.component.css` dosyalarini olusturur.

- Bu component i `app.moudule.ts` icinde declare eder. Bu sekilde Angular Component i tanimis olur.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavComponent,
    CategoryComponent,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Ana project deki `app.component.html` in icerigini silebiliriz. Sadece `router-outlet` tag i kalsin. Cunku isimize yaramiyacaklar, digerlerini yeniden olusturacagiz.

Yeni yaratilan tum component lari oraya ekle:

```html
<app-nav></app-nav>
<app-category></app-category>
<app-product></app-product>

<router-outlet></router-outlet>
```

> Bu kadariyla app icinde tum component ler gosterilecek. Burada su sekilde yazarsan calimiyor, `<app-nav />` dikkat et. Acilip kapananacak sekilde yazilmasi gerekiyor.

## Bootsrap in kurulmasi

Projede Bootstrap i kullanicaz, onun icin ilk olarak project e Bootstrap i ekleyelim;

> npm install bootstrap
> 
> npm install font-awesome

Sonrasinda ise bu css lerin, node module leri uzerinden project in tamamindan ulasilabilir olunmasi icin `style.css` dosyasina import edelim;

```css
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
```

## Nav Bar in Guncellenmesi

Nav icin bootstrap i kullanicaz;

Ilk olarak bootstrap den bir nav ornegi bulalim internet uzerinden. Sitesine gidip:
`documnetation -> component -> navbar` alitindan bir nav ornegi bul. Buradan nav bar in code unu kopyala nav.component.html icine yapistir.
Save ettikten sonra browser uzerinden goruntuye bakinca eksik css ler yoksa guzel bir goruntu gorunecek.

## Single Page in Bolumlendirilmesi

Category ve product component leri sayfa icinde yan yana Nav ise uzerlerinde gosterilmesini istiyoruz. BU sekilde daha guzel bir goruntu elde edebiliriz;

onun her component i bir div e koyuyoruz ve category ve product i ayrica bir div icine alalim. oranlama icinde bootstrap i kullanalim.
yana yana olmalari icin ortak div e bootstrap in row class ini verelim. Icindekilere de oranlari verelim.
yanyana duran div ler icin bir oran vermemiz lazim. bootstrap ekrani 12 parcaya boler onun icin category component 3 luk product ise 9 luk olsun;

```html
<!-- newly added components are here -->
<app-nav></app-nav>
<!-- main div -->
<div class="row">
    <!-- category div -->
    <div class="col-md-2">
        <app-category></app-category>
    </div>
    <!-- product div -->
    <div class="col-md-10">
        <app-product></app-product>
    </div>
</div>

<router-outlet></router-outlet>
```

## Urunlerin Listelenmesi

Product component i kisminda product larin gosterimesini saglamamiz lazim. Bunun icin ilk olarak bir tane product gostermek icin islem yapalim. Sonrasinda cogullariz.

Onun icin bootstrap de `documantation -> components -> card` kismina gidip oradan uygun bir card css template i alalim:
Sonra copy ettigimiz code u `product.component.html` e yapistiralim. Basina da bir de `h3` ile baslik atalim:

```html
<h3>Urun Listesi</h3>
<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
```

Simdlik bundan 7 tane koyalim, 7 urunumuz var. 7 sini de bir div icine koyalim, bu div in class i da olsun. o da row olsun. boylece ekrana yan yana gosterecek:

```html
<div class='row'>
    ...
</div>
```

Simdi ise `product` i `product.component.ts` dosyasindan alamaya calisilim. O zaman component class ina oncelikle bu object leri eklememiz lazim;

```typescript
export class ProductComponent implements OnInit {

// these are class properties to be used in html file
title: string = 'Urunler Listesi';
products: any[] = [
    { id: 1, name: 'LapTop', price: 2500, categoryId: 1, description: 'Asus Zenbook' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech' }
];
...
```

buradaki `title` object ini de html de kullanicaz.

```html
<h3>{{title}}</h3>
```

Simdi ise, eger products object i dolu ise ekranda list in gosterilmesini isteyebiliriz. Bu islemi yaparken `angular directive` lerinden yararlanacagiz;

Html tarafinda class property lerine gore condition yazmak icin `ngIf` directive i kullanilir;

Kullanilirken, hangi html element i gosterilecek veya gosterilmeyecek ise ona `attribute` olarak e

```html
<h3 *ngIf="products">{{title}}</h3>
```

burada code ile `product.component.ts` de eger `products` objesi yoksa veya bossa h3 tag ini ekranda gostermeyecek: (undefined veya null ise basmaz)

Aslinda `ngIf` in kullanimi su sekilde ngIf=expression; yani expression kismina istegimiz expression i yazabiliriz ayni if check de oldugu gibi.

## Urun Yoksa ekrana baska bir goruntunun olusturulmasi (ng-template)

Eger products yoksa baska bir sey gostermek istiyorsak ng-template tag ini kullanabiliriz.

```html
<h3 *ngIf="products; else noProduct">{{title}}</h3>
<ng-template #noProduct>Bu kategory de urun bulunamadi</ng-template>
```

Burada yaptigimiz sey, ngIf i biraz daha gelistirmek. expression dan sonra ; koyup else kisminda ise gosterilecek ng-template i ismini vermek.

Ekran in daha guzel olmasi icin bir css de ng-template icin bulalim. `bootstrap -> component -> alerts` kismidan bir tane css al onu da html e ekle.
bu sekilde daha da guzel oldu.

## Gelen Tum Product lar i Card template i Kullanarak Dongu ile Ekranda Gosterilmesi

Dongu yapmak icin `ngFor directive` ini kullanabiliriz;

Neyi cogullayacaksak onun tag i ne `*ngFor` yazilabilir. Mesela bizim icin card div ini cogullamamiz lazim. Her card div i bir product a karsilik gelicek. Yapisi cu sekilde  `<div *ngFor="let item of items" >`

Burada component.ts deki items listesinin tum item lari icin bir dongu ile o div den olusturulur. Sadece div olmasina gerek yok, baska html tag leri de olabilir.
Olusan yeni object bu html element i icinde kullanilabilir;

```html
<div *ngFor="let product of products" class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
```

## Type safe Calismak

`product.component.ts` icindeki any yerine baska bir class olusturulabilir,
bu class i olusturmak icin hangi component icin kullanilacaksa o folder altinda bir ts dosyasi ekliyoruz
>product.ts

Icine bize lazim olan property leri ekliyoruz.

Sonrasinda imageUrl i de html de gosterebilmek icin html kisminda eskiden src kisimi property bind kullanarak;

```html
<img src="..." class="card-img-top" alt="...">
```

Su sekilde gosterebiliriz;

bu kere onu angular dan alabilmesi icin:

```html
<img [src]="product.imageUrl" class="card-img-top"
```

sekline ceviriyoruz. bu sekilde de one-way binding yapabiliyoruz. Ya da su da calisir;

```html
<img src="{{product.imageUrl}}" class="card-img-top" alt="...">
```

seklinde de calisiyor.

>Dikat edersek, typescript class isimleri kucuk harfle basliyorlar.

## Category Ekleme

Category eklerken best practice olarak ilk, domain object ini olusturalim;

Ilk olarak `category.ts` olustur, id ve name i olsun.

Sonra, `category.component.ts` de `title` ve bir de `category` cinsinden array olusturalim
icini dolduralim.

`category.component.html` icine simdi oradaki list i populate edelim.
Daha guze bir hale getirmek icin bootstrap i kullanicaz, bunun icin bootstrap e gidip list group u deneyebilirsin: `documantation->components->list groups`

## Pipe larla Calismak

Genelde class lardan alinan object ler ile html leri kullanarak ekrana basiyoruz. Bu islemi yaparken `directive` leri kullanabiliyoruz. Directive ler cok yetenekli degiller, daha basit isler icin kullanilirlar. Ama bir object i ekranda gosterirken object uzerinde degisiklikler yapabilmemizi ve bunlari tum object lerde ayni sekilde kullanabilmemizi saglayan yapilar var. Bunlar da pipe lardir.

Ornegin; name i buyuk harfle gostermek istiyoruz o zaman:

```html
<h5 class="card-title">{{product.name | uppercase}} {{product.price}}</h5>
```

Bir pipe isareti ile `build-in` `pipe` i kullaniyoruz o kadar. Benzer sekilde `lowercase` i kullanabiliriz.
Para  icin `currency` yi kullanabiliriz. Default u dolar dir

```html
<h5 class="card-title">{{product.name | uppercase}} {{product.price | currency: "USD": false}}</h5>
```

Burada false yaparsak dolar isareti yerine USD yazar.

```currency: "USD": false: "1.2-2"```
nokta formatinda virgulden sonra iki basamak icin "1.2-2"

`currency: <param1>: <param2>: <param3>` seklinde currency pipe i calisiyor. demekki buna benzer biz de yazabiliriz.

## Custom Pipe Yazilmasi ve FormModule

Mesela turk parasi icin yeni birseyler ekleyecez. Ya da simdi yapacagimiz gibi bir filter yazacaz: yapacagimiz is bir text field ina yazdigimiz text e gore urunlerin getirilmesi. bunun icin custom pipe yazilmasi lazim. Bunu yapabiliriz.

Ama biz, bir form uzerinden girilen text e gore ekranda var olan `product` lari gostermek istiyoruz. Bunu pipe ile yapabiliz.
Pipe imiz, gelen `producs` object i uzerinde calismasi lazim. Sonra `filterText` e gore filtreleme yapicak;

`Product` a pipe yazacagimiz icin o product component in icinde pipe yazsak daha iyi bir uygulama olur.
Onun icin product icinde bir terminal ac. Sonra;

> ng g pipe productFilter

Ile pipe olustur.

Bu islem sonrasinda olanlar;

- `product-filter.pipe.ts` ve `product-filter.pipe.spec.ts` isminde iki tane file olusturdu.
- Class i ise `app.module.ts` e eklendi tabii ki declaration kismina. -- bu sekilde angular, html icinden bu pipe a ulasabilecek.

> Isimlendirme yaparken bizim pipe name ine dikkat edelim; productFilter generate edilen file isimleri bunun ilk buyuk harfe kadar olani aliyor arasina - ekliyor: `product-filter.pipe.ts`

Simdi Pipe class ina bakalim; @Pipe declaration i var. Icinde de pipe in name i belirtiliyor. Bu name ile html tarafinda call edilebilecektir.

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  // gelen product lar icerisinden, filterText e sahip olanlari donecegiz.
  transform(products: Product[], filterText: string): Product[] {
    if (!filterText) {
      return products;
    }

    filterText = filterText.toLocaleLowerCase();

    return products.filter( (product: Product) => product.name.toLocaleLowerCase().indexOf(filterText) !== -1);
  }

}
```

Bu method daki `value` gelen data ya karsilik gelir. Default olarak tipi `any` dir. Eger bunun tipini biliyorsak, onu degistirmemiz type-safe code yazmak icin gereklidir. ki bizim Pipe ugulamamizda bunu biliyoruz.
Aåyrica return edilecek data nin tipi de default olarak `any`, bunu da degistirmemiz gerek type-safe code yazmak icin.
Son olarak metod da any tipinde optional olan bir args parametresi var. bu ise pipe islimini yaparken baska parametrelere gore islini degistirebilmesini saglar. currency de `<param1> <param2>` vardi hatirlarsan. ilki hangi para birimi icin kullanililacagini belirlemek icin kullaniliyordu. bu optional oldundan istesen kullanmazsin dahi.

Bizim senaryomuzda filterlemek icin disaridan extra parameter alabiliriz; bunu `filterText` olarak alabiliriz, hatta tipini sadece string olarak degistirebiliriz ve de optional olmasin.

Bizim pipe `Product` `array` i alacak, ve `Product` `array` i return edicek. ona gore update ediyoruz.

Simdi bunu nasil kullanicaz:
bunun icin currency yi hatirla: `{{product.price | currency: USD: false}}`
Ayni bunda oldugu gibi, `... | productFilter: filterText` `filterText` i gonderiyoruz cunku o bizim search parametremiz ayni currency de oldugu gibi.

Biz bunu for dongusundeki products listesine uygulamamiz lazim. O zaman `product.component.html` deki ngFor ng-tag ine uygulayabilirz:

```html
 <div *ngFor="let product of products | productFilter : filterText" class="card" style="width: 18rem;">
```

Tabii buradaki `filterText` ve `products` property sini `product.component.ts` de define etmemiz lazim.

> Dikkat etmen gereken sey, pipe in ilk parametresi, sol kisimdaki object, digeri ise saginda kalanlar.

> Bu islemi html kisminda da yapmaya calisabiliriz, bir js ile ama angular kullandigimiz icin bunlara dikkat ederek kod yazmak daha iyidir.

> Bir diger nokta ise, html file inda pipe i import yapmiyoruz. bunu angular hallediyor. Onu da app.module.ts de pipe declare ederek kullanabiliriz.

Simdi `filterText` i ekran dan alacagiz, bunu yapabilmek icin `two-way-binding` kullanilir.

`Two-way-binding` icin `banana-model` denen bir yapi kullaniyoruz.
`product.component.html` daki `filterText` object i hem ui hem de class dan ulasilabilmeli, iki tarafdaki degisiklilerin birbirlerini etkilemeleri gereklidir. Yani two way binding bu object icin olacaktir.

Bunu soyle tanimlayabiliriz;

```html    [(ngModel)] = "filterText"
...
<input class="form-control" id="productName" placeholder="Arama metni giriniz" [(ngModel)] = "filterText">
...
```

Dikkat edersek, `two-way-binding` in html tarafi bir `input`, diger tarafi da `class property` sine isaret ediyor.
Bu sekilde input daki bir degisiklik class property sini, class daki bir degisiklik de input u gunceleyecektir.

Tabii ekrana da bir form elemani eklememiz lazim; Bunun icin ilk olarak bootstrap den git bir form icinden text field al. `documantation->components->forms` oradaki ilk div i almamiz bizim icin yeterli. Onu `product.component.html` e yapistir.

Two-way-binding in calismasi icin Angular FormModule unun import edilmesi lazim;

app.module.ts ac, FormsModule u imprt et:

``` typescript
import {FormsModule} from '@angular/forms';
.... 
,
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
],
```

Tam koda bakilabilir.

## Event-Binding Kullanarak Sepete Ekleme Butonuna Islem Yapabilme Yeteneginin Kazandirilmasi

Html tarafindaki bir input vb. elementlerin event lari (onClick, onMouseOver gibi) component in class inda nasil handle edebiliir?

Ornegin; bir urunu sepete eklme icin bir buton ekledik. Bu butona basinca bu urun sepete eklenmesini istiyoruz. Bu islemi yapabilmek icin normalde, html de normal bir buton olusturduktan sonra, onClick event ine bind olan bir JS fonksiyonu kullanacaktik. Ama Angular in kendisinin ayri bir html yapisi oldugu icin, bu islemi Angular in anlayacagi sekilde yapmamiz gerekir. Iki islemde de yapilan islemler aynidir. Ama yapilma sekilleri farklidir;

Butonun yerine bir `a` tag i kullanalim. Sonrasinda bu `a` tag inin click event ine bind olmak icin ise asagidaki gelisitirmeyi ekleyelim.

```html
<a (click) = "addToCart()" class="btn btn-primary">Add to Cart</a>
```

Burada dikkat edilmesi gereken, `click` event ine bind olmak icin kullanilan parantezlerdir. `(click) = "addToCard()"` bu sekilde `a` taginin click eventine bind oluyoruz cunku Angular in anlayacagi bir gelistirme yapiyoruz.

Sonuc olarak soyle bir kod ortaya cikiyor.

```html
<div class="row">
<ng-template #noProduct>
    <div class="alert alert-primary" role="alert">
    Bu kategory de urun bulunamadi
    </div>
</ng-template>
<div *ngFor="let product of products | productFilter : filterText" class="card" style="width: 18rem;">
    <img [src]="product.imageUrl" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">{{product.name | uppercase}} {{product.price | currency: USD: false}}</h5>
    <p class="card-text">{{product.description}}
    </p>
    <a (click) = "addToCart()" class="btn btn-primary">Add to Cart</a>
    </div>
</div>
</div>
```

Html tarafini hazirladiktan sonra, component class (`product.component.html`) ina, `addToCart` methodunu yazmamiz gerekir. Yoksa hata verecektir. Sonrasinda `a` tagine tiklaninca bu method call edilecektir.

Eger sepete eklenecek urunu de fonksiyona gecmek istersek, sadece `(click) = "addToCart(product)"` seklinde methoda parameter eklememiz yeterlidir. Cunku o **ngIf directive** **closure** `product` object ulasilabilirdir.

Bu arada bu islem, `(click) = "addToCart()"` one-way-binding olarak gecer. Sadece template kismindan class kismina gecis saglanir.

## 3rd Party JS Library lerinin Application a Eklenmesi

*Application* larda, **3rd party JS library** leri eklenmesi gerekebilir. Ornek olarak bizim uygulamamizda *AlertifyJs* i application imiza ekleyecegiz.

AlertifyJs, pop-up olarak mesaj gostermeyi saglayan bir kutuphanedir.

Ilk olarak uygulamamiza AlertifyJs kutuphanesinin eklenmesi gerekir. Bu islem package.json a eklenerek de yapilabilir, ya da ayni dizinde;

>npm install alertifyjs

Library eklendikten sonra node_modules un altina library kodlari gelir.

AlertifyJs adi ustunde js library sidir. Ayrica icinde css de barindirir. Yani JS ve CSS dosyalarinin da uygulamaya eklenmeesi gerekir. Bu dosyalarin uygulamanin her tarafindan ulasilabilir olmasi icin ikisi de global olarak eklenmesi gerekir. Bundan once bootstrap ve font-awesome library lerinin CCS lerini eklemistik (genel style.css dosyasina). Ama burada durum biraz farkli. Cunku angular da style.css gibi genel bir js dosyasi yok. Onun icin, genel style.css dosyasinin project e tanimlandigi yere yani angular.js dosyasini aciyoruz. Bu dosya src dosyasiyla ayni yerdedir. Bu dosya project hakkindaki tum dosyalari tutar. Genel style.css dosyasi da onlardan biridir.
Orada;

```html
....
        "styles": [
            "src/styles.css"
        ],
        "scripts": [],
        "es5BrowserSupport": true
    },
....
```

Burada gordugumuz sudur, global **styles.css** dosyasi, project e `styles` tanimlanmistir. Benzer sekilde AlertifyJs in JS dosyasini da projeye `scripts` property si araciligiyla eklenebilir.

```html
....
        "styles": [
            "src/styles.css"
        ],
        "scripts": ["./node_modules/alertifyjs/build/alertify.min.js"],
        "es5BrowserSupport": true
    },
....
```

Folder in yerini ise AlertifyJs in sitesinden de bulabilirsin ama *node_modules* un altindan da bulabilirsin.

Sonra AlertifyJs icin gerekli olan css dosyalarini da import edelim. Tabii bunlari genel *style.css* dosyasina direk import edicez:

```css
    @import '~alertifyjs/build/css/themes/bootstrap.min.css';
    @import '~alertifyjs/build/css/alertify.min.css'
```

Bu sekilde AlertifyJs in JS ve CSS dosyalarini projeye ekledik. Simdi, sepete bir urun eklendiginde islemi pop-up ile ekranda gosterelim. Onu da `product.component.ts` icerisinde `alertify` object ine ulasarak yapicagiz. Ama simdi `alertify` e nasil ulasiriz, onu bulmamiz lazim. O da soyle, `declare` keyword u ile yapiyoruz. Bu keyword, 3rd party library lerde bulunan object lere bakilirak map leme islemi yapilir. `product.component.ts` de global olarak tanimi ekleyelim;

```typescript
declare let alertify: any;
```

Sonrasinda artik alert yerine `alertify.success` method unu kullanarak ekranda pop-up un gosterilmesini sagliyoruz.

```typescript
...

declare let alertify: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit { 

  success(message: string): void {
    alertify.success(message);
  }
...
```

> **Dikkat**, yeni bir library eklendiginde, project in build edilmesi gerekiyor. Bu yuzden ng serve u kapatip acmak gerekiyor. Yani terminal den restart lazim.

JS ler icin de genel bir JS file i olsa ne olurdu? JS de bir JS file dan baska JS file i import etmek normalden zor bir islem oldugu icin bu sekilde yapislar JS in module yapisi kullanilmasi gerekir. Yoksa sorunlar cikabiliyor. Diger method lar ise biraz zorlama gibi. ama yine de arastirilabilir.

## Angular Service Kullanrak AlertifyService Yazilmasi

Bir fonksiyonalitenin tekrar tekrar, farkli component ler tarafindan kullanilabilirligi arttirmak icin Angular `service` ler kullanilir.
Javadaki service yapisiyla benzerdir, singleton veya component specific olabilir.

Uygulama icin;

- App altina yeni bir folder create et, ismi `services` olsun.
- Sonra services folder ina locate olduktan sonra su komut kos:
    ng g service alertify

ng komutunu kostuktan sonra neler oldu:

- <service_name>.service.spec.ts adinda service test class i olusturuldu.
- <service_name>.service.ts adinda da bir service class i olusturuldu.
- olusturululan service ismi is <service_name>Service olarak olusturuldu. Bizim senaryomuzda: *AlertifyService*

Bu sekilde bir service nasil yazildigini gormus olduk. Simdi AlertifyJs icin bir service yazalim, cunku AlertifyJs tum component lar tarafindan kullanilibilir olmasini istiyoruz.

### Angular Service Incelenmesi

*Service* bir class dir, bu class *Injectable* decorerator ini icerir. *Injectable* declaration icinde **providedIn** property si bulunur. Bu da bu object in hangi scope da olusturulacagini soyler. Ornegin bu service root icin, yani global olarak eklenmistir (Application da bir tane, Singleton gibi). Service component bazli olarak da olusturulabilir.

Her service i global yapsak? Olmaz, birincisi gereksiz yere object tutabiliriz. Ikincisi bazi component larin service lerde yaptigi is, kendisine ozel kalmasi gerekebilir. Bu durumda da sorun olurdu.

Tamam, simdi **AlertifyService** inin success fonksiyonu olustur. Oraya bir mesaj gonder, onu da alerify object ini kullanarak ekrana bastir. Alertify object ini declare etmistin, daha once yaptigimiz gibi.

```typescript
import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message: string): void {
    alertify.success(message);
  }

}
```

Service i yazdim, simdi bunu bir *component* dan kullanmamiz gerekiyor. Bu islem icin **AlertifyService** ini kullanicagimiz component class ina inject etmemiz gerekiyor. Sonradainda service function larini component dan kullanilabilir hale gelicegiz.

**Dependency injection** icin *component* class inin constructor una parametre olarak bu service i vericegiz. Sonra Angular component constructor unda service parametresini gorunce, ilk olarak kendi class indaki `@Component` declaration inin `providers` property sinie bakicak. Eger bu service orada tanimlanmissa, component *a ozel bir tane service* **(local service)** olusturacak sonra da component a inject edicektir. Eger yoksa, projenin nin global context inde bu service object i tanimlanmis mi diye bakicak. Eger tanimlanmissa, o object i component a inject edecektir. Eger global da da yoksa hata verecektir. Ornegin `product.component.ts`

```typescript
        ....
        constructor(private alertifyService: AlertifyService){

        }
        ....
```

Sonrasinda `product.component.ts` de artik service den ekrana mesaj basicaz:

```typescript
    ...
    addToCard(message: string){
        this.alertifyService.success(mesaj);
    }
    ... 
```

Burada AlerifyJs global bir service oldugu `provider` olarak eklemedik.

Bir service i global olarak eklemek icin;

- `Injectable` declaration icindeki `providedIn` property si service objesinin **root** olarak verebiliriz. Ama bu yeni angular version ininda gecerli. Eskilerde farkli bir yaklasim var.
- `app.module.ts` class icindeki `NgModule` deki object icindeki `providers` array ine service i ekleyebiliriz. Bu eski yaklasimdir. Ama eger, global service leri bir yerden gormek istersen bu yaklasim daha iyidir. Ornegin `product.component.ts`;

```typescript
...
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
...
```

> Ikinci yontem ile service i tanimlasan bile, Injectable declaration ini kaldirmaman gerekir, cunku Angular, service i bu annotation ile taniyor.

Bir service i local olarak eklemek icin ise; *component* class indaki `@Component` declaration ina providers property sine eklenir.

```typescript
        ...
        @Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.css'],
            providers:[AlertifyService]
        })
        ...
```

### Global ve Local Service Farkliliklari

Global service, browser dan application acildiginda, kullanilip kullanilmayacagina bakilmaksizin Angular tarafindan olusturulur ve global context e eklenir. Bir tane instance i vardir.

Local service ise component specific olusturulurlar. Burada onemli bir nokta var; eger component specific bir service i kullaniyorsan, her component icin ayri service object i olusturulur. Buna dikkat. Yoksa farkli sonuclar alinabilir.

## JSON Server Yapilandirilmasi

Backhand de data lari cekmek icin buildin bir server kullanalim. Bu islem icin npm package i kullanacagiz. Bu package in ismi, `json-server`. Kurmak icin;

> npm install -g json-server

Kurulumu yaptiktan sonra, serve edilecek data nin olusuturmasi lazim. Bunun icin bir tane `shop.json` olustur. Bu bir *json* object barindirsin. Bu json da endpoint ler ve bu endpoint ler istenince donuecek json data lar olacak.

Kurduktan sonra o json i serve etmek icin:

> json-server --watch shop.json

## REST API Kullanilarak Uygulamaya Bilgi Saglamak

Backend in sundugu data lari uygulamamizda kullanacagiz. Bu islem icin, `HttpClientModule` u kullancagiz. Bu Angular in sundugu bir **module**dur. Ilk olarak onu uygulamada kullanacagimiz Angular a belirtmemiz lazim. Bunun icin **module** u `app.module.ts` kullanarak import edelim:

```typescript
...
import { HttpClientModule } from '@angular/common/http';
...

imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
],
...
```

Simdi, server tarafindan sunulan urunleri uygulamada gosterelim. Bunu yapmak icin, *ProductComponent* class indaki products property sinin artik server dan alinan data ile guncellememiz gerekiyor. Bu islem icin ilk is, *HttpClientModule* icinde bulunan **HttpClient** sinifinin *ProductComponent* class ina inject edilmesidir.

deki class property olan products i elle vermek yerine rest api uzerinden alicagiz. Bunun icin ise httpclient i product.component.ts e inject etmemiz lazim. `product.component.ts` class inda;

```typescript
...
constructor(private alertifyService: AlertifyService, private httpClient: HttpClient) { }
...
```

Sonrasinda `httpClient` objesini, class da var olan **ngOnInit** method u icinde yapariz. Cunku bu method component ilk load olurken cagirilir. Bu method ayrica class in impement ettigi OnInit interface inden gelir. `product.component.ts`:

```typescript
...
ngOnInit() {
    this.httpClient.get<Product[]>("http://localhost:3000/products").subscribe(data => { this.products = data });
}
...
```

Bu yapilan islem:

- HttpClient objesinin *get* method una subscribe olmak. Bu su demek; get method u verilen *url* e *HTTP GET* request i atiyor. **subscribe** method u ise atilan request in sonucunda gelen response un subscribe method u icerisine verilen function araciligiyla islenmesini sagliyor.
- *get* method unun ekledigimi generic class gelen response un product array tipinde oldugunu belirtmek icindir. Bu sekilde subscribe method u icine gelen response data nin Product array ine cast edilir. *Type safety* islemini saglamis olduk.

## HTTP Islemleri icin Service Olusturmak

Product lari ceken API islerini service inde halledersek daha iyi olacak, moduler bir yapiya sahip olacak project imiz. Hemen bir service olusuralim, services dizini altinda;

> ng g service product

Bu service *ProductComponent* ina ozel olsun, diger component larda gerekli olmadigi icin. Local bir service olusturmak icin **Injectable** declation ini icindeki **providedIn** property sini silelim. Sonrasinda ise ProductComponent icindeki **Component** declaration ina **providers** array property sine service i ekle.

Local service olabilir ama Injectable declaration ini kullanman gereklidir cunku Angular bu declaration ina gore Bu class in bir service oldugunu anlar.

Simdi Http Islemlerini service e alalim. Bunun icin product lari service den alan methodu bu service e almak lazim.**subscribe** isini yine component e birak cunku service in isi data yi getirmek, gelen data nin ne yapilacagi component a ait.

Ayrica *httpClient* i hicbir zaman component da kullanma, data yi getiren tarafda yani service de kullan.

HttpClient i service e tasiyoruz;

- Service i component a inject ediyoruz.
  - Service de getProducts method u yaziyoruz. Bu method component icin *http* request i yapacak ama subscribe isini yine component yapacak. Bunun boyle olmasinin nedeni ise data yi kullanacak olanin yine component olmasi. hata da olsa onu component halletmelidir.
  - Simdi, component in subscribe method unu kullanabilmesi icin getProducts method u Observable<Product[]> tipinde return u olmalidir. onu da ekledigimiz de service metod umuz:
  
    ```typescript
        ...
        getProducts(): Observable<Product[]> {
            return this.httpClient.get<Product[]>(this.path);
        }
        ...
    ```

  - Sonrasinda bu service i ProductComponent da call ettik ve ngOnInit method unda ise service uzerinden getProducts method unu call ederek products object ini doldurduk.
  - Service i root yapmadigimiz icin ise `product.component.ts` class inda Component declaration ininda providers olarak service i tanimladik:

    ```typescript
        ...
        @Component({
          selector: 'app-product',
          templateUrl: './product.component.html',
          styleUrls: ['./product.component.css'],
          providers:[ProductService]
        })
        ...
    ```

Burada onemli bir durum var. Biz service den method u cagirdiktan sonra subscribe method unu kullanip gelen data yi isledik. JS bunu yaparken aslinda service method unu call eder etmez, http request in response unu beklemeden bir alt satira geciyor. Buna reaktif programlama denir. Soyle yaptik;

- ngOnInit method unun son line ina console.log  ile log bastridik; loading bitti diye, ayni zamanda subscribe method unun icine de log bastirdik, data geldi diye. sonra log lara baktik ki, ngOnInit daha once basilmis.

## HTTP Hatalarinin Ayiklamanmasi

Log lama islemi de, errorAyiklama islemi de httpClient a bagli olarak yapilabilir. Cok guzel bir uygulamasi var. Service method u icinde http get method unu kullandik. Hemen sonuna **pipe** method unu kullanabiliriz. **pipe** method u **iki tane callback method** icine alir, subscribe daki tek callback method uydu. Bunlardan biri **tap**, icincisi ise **catchError** method u dur. tap method u log lama vb. isler icin kullanilirken, catchError error ciktiginda yakalamak icin kullanilir.

Soyle dusunelim, request attik, response bekliyoruz ama reactive sekilde (yani browser thread i block lanmamis)

Method call siralamalari bu sekildedir.

> get -----> tap -----> catchError -----> subscribe

**tap** ve **catchError** method larini kullanabilmek icin aslinda o method lari import etmemiz gerekiyor ve sonra **catchError** da **error** u yakalayip baska bir error da atabiliriz. Bunun icin;

```typescript
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators';

...

getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.path).pipe(
    tap(),
    catchError(this.handleError)
    );
}

private handleError(handleError: HttpErrorResponse) {
    let errorMessage = '';
    if (handleError.error instanceof ErrorEvent) {
    errorMessage = 'Bir hata olustu: ' + handleError.message;
    } else {
    errorMessage = 'Sistemde bir hata olustu'
    }
    return throwError(errorMessage);
}

...
```

## Category Service inin Hazirlanmasi

Ilk olarak service i olusturuyoruz;

> ng g service category

Sonra bunun genel global bir service degil de local service olmasi icin *Injectable* declaration i icindeki object i silinip sonrasinda component icindeki Component declaration ina providers olarak belirtmemiz lazim.

Sonra *CategoryService* ini inject ediyoruz category component ina.  
Sonrasinda ise *CategoryService* inde *getCategories* method unu yaziyoruz.
Sonrasinda httpClient i import edip kategorilerin cekilecegi method u yazdim. Bu metoda *pipe* i dolayisiyla *tap* ve *catchError* method unu yazdik.

## Routing Mimarisi ile Calismak

Bir link e tikladigimizda baska bir component in gosterilmesini **route** ile saglariz.

Bu islem icin **RouteModule** unun uygulamaya eklenmesi lazim. Bu module projeyi olustururken eklenmisti. Routing islemlerini saglayan dosya ise `app-routing.module.ts` file idir.

AppRoutingModule eklernirken,

- AppRoutingModule (`app-routing.module.ts`) adinda bir class olusturulur, bu class *@NgModule* declaration ini sahip ve bu declaration icine bir *routes array* i import edilmis (bu sekilde eklenen route lari project e ekliyor), bir de kendisini export etmis:

```typescript
...
const routes: Routes = [];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { } 
...
```

Sonra tiklanildiginda gosterilecek component ana component html inde bulunan, `<router-outlet></router-outlet>` tag i icerisine eklenir. Bu sekilde ekranda gosterilir.

Bir route eklemek icin yapilcak is, routes objesine kurallar eklemektir. Ornegin, product component icin bir route yazalim;

```typescript
  const routes: Routes = [
      {path:'products', component: ProductComponent}
  ];
```

Bu sunu soyluyor, url e `http://localhost:4200/products` gelince bu component in load edilecegini soyluyor angular a.

URL e hicbirsey yazmamissa products a yonlendirilmesini saglayabiliriz. (`http://localhost:4200/`)
Burada onemli bir nokta var, eger url e sacma birsey yazarsak ana sayfaya yonlendiliyor, ama sadece url e hicbirsey yazmayinca products a gitmesi icin bir parametre daha kullanmammiz lazim. Bunu **pathMatch='full'** property siile yaparabilriz

```typescript
    const routes: Routes = [
        {path:'products', component: ProductComponent},
        {path:'', redirectTo:'products', pathMatch='full'}
    ];
```

### Routing mimarisinin nasil calistir?

Aslinda AppRoutingModule `app.module.ts` de import edilmis. Yani angular a bizim routing module umuz budur denmis. tamamdir, Angular Routing Module den bu sekilde haberdar olmus, burasi ok.

Simdi eger url den bir path yazilinca angular nasil calisiyor onu anlayalim. URL den path i aliyor. Sonra *AppRoutingModule* deki *routes array property* si icerisindeki route lara bakiyor. Ilk basta route array inde birsey olmadigindan `index.html` uzerinden `app-root` u cagiriyor. `app-root` icindeki `app.component.html` i load ediyor. `app.component.html` icinde bir tane tag var:

```html
  ...
      <router-outlet></router-outlet>
  ...
```

Buna dikkat. Eger load edicek bir route u varsa o route icin kullanilcak component i bu router-outlet tag i icinde load ediyor.

Buraya kadar, onun icin ilk route array ini doldurdugumuz da iki tane product component i cikti. 

```html
  <!-- newly added components are here -->
  <app-nav></app-nav>
  <!-- main div -->
  <div class="row">
      <!-- category div -->
      <div class="col-md-2">
          <app-category></app-category>
      </div>
      <!-- product div -->
      <div class="col-md-10">
          <app-product></app-product>
      </div>
  </div>

  <router-outlet></router-outlet>
```

Cunku hem `router-outlet` icinde hem de `app-product` tag i icinde product component i load ediliyor.

Bu ikili goruntuyu kaldirmak icin `app-product` tag i siliyoruz, onun yerine `router-outlet` i koyuyoruz:

```html
    <!-- newly added components are here -->
    <app-nav></app-nav>
    <!-- main div -->
    <div class="row">
        <!-- category div -->
        <div class="col-md-2">
            <app-category></app-category>
        </div>
        <!-- product div -->
        <div class="col-md-10">
            <router-outlet></router-outlet>
        </div>
    </div>
```

Bu sekilde ProductCompnent inin iki kez ekranda gosterilmesi sorununu kaldirdik.

## Router Mimarisi Ile Route Edilen Component ler Ulasilmasi

Kategoriler kismindan bilgisayar a tikladigimiz da bilgisayara ait urunlerin gelmesi, elektronik e tikladigimizda elektronik e ait urunlerin gelmesini saglamak istiyoruz.

Soyle bir url olmali olusmali `../products/category/1` veya `../products/category/2`

Burada uc gelistirilmesi gereken nokta var;

- Route kurallarinda bir url parametresi ile bir Component in cagirilmasi saglanmali
- Uygulama icerisinde istenilen component in gosterilmesine linkin verilmesi ve bu linkin icerisine url paramtresinin saglanmasi.
- Component in url den gelen parametreyi okumasi

**Ilk engeli** su sekilde asabiliriz. `routes` property sindeki kurali guncelleyelim;

```typescript
    {path:'products/category/:categoryId', component: ProductComponent}
```

Buradaki `:` ve sonrasindaki `categoryId`. Buna dynamic sayi bilgi almak diyebiliriz. Buradaki `categoryId` parameter ismi onemlidir. Cunku component tarafindan alinirken kullanilacaktir.

**Ikinci engel** i asmak icin, `/products/category/1` gibi bir url olusturmak ve bu linke tiklanilabilir yapmaktir.
Ornek olarak kategory component daki for loop u icinde routerLink property sini kullanicaz. One-way binding i de kullanarak categoryId yi html tarafinda kullanicaz:

```html
  <a class="list-group-item" routerLink='/products/category/{{category.id}}'>{{category.name}}</a>
```

> RouterLink sadece `a` element ine verilebiliyor.

Ucuncu engel icin bir sonraki basliga bakabilriiz.

## Component larda URL den Gelen Parameter Bilgileri Kullanabilmek: ActivatedRoute

Yukarda da soyledigimiz gibi url deki parametereleri alabilmek icin **ActivatedRoute** u kullanicagiz, bunun kullanimi da oldukca basit, normal bir service kullanir gibi bir object i component a inject edicegiz, sonrasinda **ActivatedRoute** object inin **params property** sine **subscribe** olucaz, degisikliklerden haberdar olmak icin. (Observable mimarisi). Bu islemi ise **ngOnInit** method unda yapicaz:

Ilk olarak, component a git. `product.component.ts` e ActivatedRoute u inject et ve url den parametreyi al.

```typescript
...

constuctor(private activatedRoute: ActivatedRoute) {}

ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.productService.getProducts(params['categoryId']).subscribe(data => {
            this.products = data; console.log('data has came: ' + JSON.stringify(data));
        });
    });

    console.log('onInit finished Loading');
}
...
```

Simdi ise *ProductService* ine alinan param dan *categoryId* yi gondermek is. O da oldukca kolay. **params** map inden **categoryId** li entry nin value sunu aliyoruz. ve onu service a pass ediyoruz

### Kategorileri Ceken Methodun Guncellenmesi

Bazen categoryId bos olarak gelebilir ki bu normak, direk olarak products url ini call edersek browser dan yine product component cagirilacak, o da ayni ngOnInit method unu call edicek, orada da activated route olmayacagindan categoryId service e undefined olarak gidecek. Boyle olmasa bile method un daha kullanisli hale getirilmesi icini categoryId defined ise category sec diyebiliriz:

```typescript
    ...
    getProducts(categoryId: string): Observable<Product[]> {
        let requestPath = categoryId ?  this.path + '?categoryId=' + categoryId : this.path;
        return this.httpClient.get<Product[]>(requestPath).pipe(
        tap(data => console.log('In tap function: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
    }
    ...
```

## Gorsel Tasarimin Iyilestirilmesi

Simdi ise tasarimin iyilestirilmesi uzerine ugrasacagiz,

Bootstrap den bir dashboard ornegi aliyoruz. bootstrap -> examples -> dashboard kismina gidiyoruz.
Oradaki ornegin source code undan body kismini kopyaliyoruz. bunu da app.component.html e ekliyoruz. script kisimlarini da cikardik.

Tam olarak istedigimiz bir goruntu elde edemedik cunku bu html de baska css dosyalari da mevcut. onlari da source code dan aliyoruz.
Sonra o css i de component in css dosyasina ekliyoruz. tabii o da app.component.css dosyasi olacak.

simdi ise aynisi goruntuyu elde etmis olduk.
dashboard gelmedi cunku orasi script araciligiyla populate ediliyordu. orasini sildik.

sonra menu icin baska bir bootstrap ornegine gidiyoruz. ayni yerden blog a giriyoruz, oranin menu kismini yine ayni sekilde view source a basarak aliyoruz.
onu da gittik yine app.component.html de html main tag inin icine koyduk. onun icin muhtelif bir css dosyasina ihtiyac yok.
sonra dashboard ve section kismindan kurtulalim 
en son search i de sildik cunku bizim search umuz var.

son olarak bizim category ve nav component ini de kaldiriyoruz. sadece product component ini gosterecegiz. o da main in icinde olmali.

urun listesi yazdigimiz header kismini da product component dan kaldiralim. 

simdi ise product listesini gosterdigmiz yerde biraz yukari ile hizalama sorunu var gibi goruluyor. onun icin card element ina bir css class i yazalim onu da element e vereli:

product.component.css file ina:
.productBox{
    padding : 15px;
}

bunu da product.component.html de class olarak ver.

bootstrap 4.2 ile calisiyoruz, onun example larina bakabilirsin.

### Kategori Component inin Adam Edilmesi

Bunu yaparken de eskisi gibi category componet i cagiracagiz. Cagirmadan once ise, html de menu icin kullandigimiz  tag lari `app.component.html` den kesip aliyoruz ve onu `category.component.html` e yapistriyoruz:

Simdi category.component.html de cogullayacagimiz sey ise a tag i. Ona gore ngFor ona ekliyoruz, ayrica routerLink i de ona ekliyoruz.

Diger eskiden kalan kisimlari da siliyoruz.

O islemleri yaptiktan sonra category component ini product component indan call etmemiz gerekiyor.
Bunun icin ise product.component.html icine category component inin selector name i ile bir selector create ediyoruz.

### Sol Tarafin Adam Edilmesi

Company Name yerine E-Ticaret App yaziyoruz.
`dashboard` yerine ise tum urunleri gostermek icin routerLink veriyoruz. ismine de magaza de.
sonra ise product ekleme icin bir menu elemani ekle. ilki klasik yontemle olsun ikincisi reaktive yontemle olsun. Iki ayri yotem var angular da.

burasi ise app.component.html de bulunuyor. orayi edit liyoruz.
yeni router link ler ekledikten sonra onlarin da routing ini yapmamiz lazim. onu da app.routing-module.ts de eklemeyi unutmayalim:

```typescript
... 

{ path: 'product-add-1', component: ProductComponent },
{ path: 'product-add-2', component: ProductComponent },
...
```

## Klasik Formlarla Calismak

Angular da iki cesit form yazilir, birincisi klasik form lar ikincisi reactive formlardir. Simdi klasik formlara bakalim;

Ilk olarak yeni bir tane component eklememiz lazim.
Onun da product in icinde yapmamiz daha mantikli cunku moduler kod yazmak amacimiz.
O zaman product folder i icinde;

> ng g component product-add-classic-form

Product eklemek icin kategori bilgisi lazim. Bunun icin kategorileri serverdan cekmek icin **CategotyService** in **ProductAddClassicFormComponent** a inject edilmesi lazim. Bu local bir service olmasini istiyoruz.

Product tipinde bir model object i tanimladik cunku bu object form dan eklenecek product bilgilerini tutacak. `product-add-classic-forms.component.ts:`

```typescript
  ...
  @Component({
  selector: 'app-product-add-classic-forms',
  templateUrl: './product-add-classic-forms.component.html',
  styleUrls: ['./product-add-classic-forms.component.css'],
  providers: [CategoryService]
  })
  export class ProductAddClassicFormsComponent implements OnInit {
    model: Product = new Product();
    categories: Category[];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(data => this.categories = data);
    }
  }
  ...
```

Altyapiyi kurduk, simdi klassik formlar kullanarak class daki model objesinin doldurulmasi gerekiyor.

## Klasik Form Isleriyle Ugrasma

Simdi ilk olarak `product-add-class-forms.component.html` i acip, icindekini siliyoruz.
`h3` ile Yeni urun ekle basligini atiyoruz.

Sonra html form tag ini yaziyoruz. Burada Angular form olarak kullanilabilmesi icin form tag ina `#productAddForm="ngForm"` seklinde bir property veriyoruz. Ve angular tarafinda form umuzun ismi de `productAddForm` olacak. Form isminin onemi yoktur, sadece html sayfasi icerisinde kullanilacak.

Bu form ismi ile component in class insimdi bu form bilgilerini submit etmemiz lazim. Onu da yine `form` tag ina property olarak girecegiz. o da su sekilde `(ngSubmit) = "add(productAddForm)"`. Burada sunu soyluyoruz, form submit edilinice class daki **addProduct** methodu call edilecek. Icersine de **addProductForm** object i pass edilecek.

```html
...
    <h3>Yeni Urun Ekle</h3>
    <form #productAddForm="ngForm" (ngsubmit) = "add(productAddForm)">
...
```

Simdi component in class inda add method unu yazalim. Burada add method u NgForm tipinde bir parametre icine alicak.

```typescript
  ...
  add(form: NgForm){
      // form.value form icindeki input larin inputName-value seklinde getirilmesini saglar.
      console.log(form.value)
  }
  ...
```

Simdi ise html tarafindan inputlari class tarafina alalim. Bunun icin ilk olarak html *input* tag ini kullanicaz

```html
  <div class="form-group">
    <!-- birinci input alani kullanicilar icin acikalma -->
    <!-- ikinci bu Angular form input unun ismidir. Angular uzerinden object e ulasmak icin kullanilir. En altta oldugu gibi, bu alanin dirty olup olmadigina, validity sine baklmak icin gereklidir. Bu isim sadece html tarafinda kullanilacaktir. Karsisindaki ngModel kismi onemlidir. -->
    <!-- ucuncu attribute, class daki model object i ile buradaki input u birbirine  esitledik. Two-way binding, banana notation -->
    <!-- dorduncu attribute da onemli, ngForm object icinde, bu input icin propertyName dir -->
    <!-- geriye kalanlar html icin onemli olan attribute lardir. -->
    <input placeholder="Urun Adi" #name="ngModel" [(ngModel)]="model.name" name="htmlName" class="form-control" id="htmlName" required />
    <div *ngIf="name.invalid&&name.dirty" class="alert alert-danger">
        Urun ismi gereklidir.
    </div>
  </div>
```

Input Validation inin yapilmasi; sonrasinda ise eger name kismi validation i icin hata olunca basmasi icin bir div

```html
  <div *ngIf="name.invalid&&name.dirty" class="alert alert-danger">Urun ismi girmek gereklidir.</div>
```

Buradaki name `ngModel` da kullandigimiz angular form icin kullanilan diesli (#) name. Input state leri de sunlar;

- `name.invalid` demek yani bos  demek.
- `name.dirty` demek adam name e birseyler yazdi, sonra sildi, kirli kaldi
- `name.touched` ise adam name input una dokundu, yani fokus ladi sonra focus unu baska yere verdi
- `name.pristine` ise ilk giriste bos ikenki hali.

Bu durumlara gore validation yapilabilir.

Simdi category ler icin bir **select** olusturalim.

Yine bir div icine html **select** tag i icine de **option** tag i yazalalim. Kategoriler **ngFor** ile cogullanacak cunku kategoriler onlarin icinde olacak:

```html
  <div>
      <select #categoryId="ngModel" [(ngModel)]= "model.categoryId" id="htmlCategoryId" name="htmlCategoryName" class="form-control" required>
          <option *ngFor="let category of categories" [value]="category.id"> {{category.name}} </option>
      </select>
      <div *ngIf="categoryId.invalid&&categoryId.touched" class="alert alert-danger">Urun kategory si gereklidir.</div>
  </div>
```

Bi de buna bir alert div i ekleyelim. cunku bu field da required. burada angular object inin touched olmasina bakiyoruz

Simdi buton ekleyelim. Bu da html button dan ilerleyerek yapicaz

```html
  <button type="submit" class="btn butn-primary" [disabled]="productAddForm.invalid">Urun Ekle</button>
```

Bir urun ekleme butonumuz var. **type** i ise **submit** class ini da bootstrap den aliyoruz. Bi de form valid olmadigi surece tiklanilmaz yapiyoruz. (Sanirim icindeki tum required field larin doldugunda form valid oluyor.)

## POST ile Server a Urun Ekleme

Urun ekliyecez, bunun icin oncelikle **ProductService** inde urun ekleme icin bir service olmali. Bunun icin ilk olarak product service ine addProduct method u yaziyoruz.

**ProductService** ine ekleme yaparken, HTTP POST method u kullanicaz. **json-server** eklemeye de izin veriyor bu arada.

**httpClient** in **post** method u 3 tane parametre aliyor. Bunlardan ilki **url**, hangi url e request edilecegi, ikincisi **request body si icin hangi object** i kullanacagimiz, ucuncusu ise *optional* olarak **httpOptions** object i. Bu object in icinde http header lari eklenebilir. Http header object i icinde de atilacak http request icin header bilgileri eklenebilir. Biz ise Content-Type ve Authorization header larinin dolu gitmesini istiyoruz. onun icin httpOptions icindeki httpHeaders object ini dolduruyoruz.

```typescript
...

addProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token'
      })
    };

    return this.httpClient.post<Product>(this.path, product, httpOptions).pipe(
      tap(data => console.log('In tap function: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
}
....
```

Sonunda boyle bir method u elde etmis oluyoruz. Yine response olarak bir **Product** object i dondurdugumuzu soylememiz lazim. Onu da belirtiyoruz. Server in yetenegine bagli birsey bu.

Sonra bu method u ise component dan cagiriyoruz, `product-add-classic-form.component.ts` deki *addProduct* method u icinde. Oncelikle ProductService ini inject etmemiz lazim. Sonra ProductService inin addProduct ini call edip ona subscribe olmamiz lazim.

Subscribe sonucunda da alertify service ile eklenen product in alert ini basalim.

```typescript
    ...
    add(form: NgForm) {
        this.productService.addProduct(this.model).subscribe(data => {
          this.alertifyService.success( data.name + ' isimli urun eklendi.')
        });
        // burada html den bilgiyi cekmek istersek htmlName indan almamiz gerekiyor, yoksa gelmez, id ile cekemiyoruz.
        // console.log("Eklenecek urun adi: " + form.value.htmlName);
        // console.log("Eklenecek urun kategory idsi: " + form.value.htmlCategoryName);
    }
    ...
```

Burada form object ini hic kullanmadik, aslinda bunu gostermemizin sebebi nasil yapilabilecegi uzerine idi.
Tabii service leri ekledikten sonra component declaration ininda providers array ine eklemeyi unutma.

Ekledigimiz resmin buyuklugu fazla oldu. simdi resmin boyutlarini ayni hale getirelim:

```css
img {
    width: 200px; /* You can set the dimensions to whatever you want */
    height: 200px;
    object-fit: cover;
}
```

Bunu da product component inin css ine eklemeiz lazim. ve de card div indeki ufak bir css i kaldirdik. yoksa yine uzun gorunuyordu. `style="width: 18rem;"`

## Reactive Form ile Urun Ekleme

Reactive form, yeni form library si. Avantaji ise validation islemini component de yapmak, boylece form islemlerini tek bir merkezden yonetibilecegiz. Ayrica bu da bize validation kisminin unit testlerinin yapilabilmesini saglayacaktir. Hemen ise koyulalim;

Reactive form component ini olusturalim. Bunu yine product folder i icinde yapmamiz daha iyi olur;

> ng g component product-add-reactive-forms

Reactive form olusturabilmek icin component da iki temel objemiz olmasi lazim:

- FormBuilder
  Bu service degil sadece bir library, bunu service gibi inject etmemiz gerekiyor.
  Bu obje html input larinin olusurulmasi ve validation larinin yapilmasi islemlerini yapmak icin kullanilir.
- FormGroup
  Bunu class property si olarak tanimliyoruz.
  Bu object ise iliskilendirilen form dan gelen data yi tutacak. Bir template gibi.

Sonrasinda html tarafindaki form ile iliskilendilmesi ve vaidation icin component tarafinda **createAddProductForm** method unu yaziyoruz. Icinde de form u html ile birlestirip validation larla birlikte form u kullanima hazir hale getirecez.

```typescript
...
export class ProductAddReactiveFormsComponent implements OnInit {
    productAddForm: FormGroup;
    model : Product = new Product();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.createAddProductForm();
    }

    createFormGroup(): void {
        this.productAddForm = this.formBuilder.group({
          name: ["", Validators.required],
          description: ["", Validators.required],
          imageUrl: ["", Validators.required],
          price: ["", Validators.required],
          categoryId: ["", Validators.required]
        });
    }

    add(){
        if(!this.productAddForm.invalid){
            this.model = Object.assign({}, this.productAddForm.value); 
        }
    }
}
...
```

Buradaki **createFormGroup** method u bir tane Angular Form yaratiyor. Buradaki onemli nokta, group methodu icerisine alinan object tir. Bu object in icinde html tarafinda aranacak input value lari ve validation kurallari bulunur.
Sonrasinda ise, html tarafinda buradaki property name lerine karsilik gelecek html input lari hazirlayacagiz.

Simdi ise html kismina gecelim;

- h3 ekleyelim, ismini verelim
- Yine bir html form yaratalim. Bu kere component class indaki **formGroup object ile bunu iliskilendirme yapmamiz lazim**. Bunun icin property assignment yapmak lazim. Sonrasinda ise submit sonrasinda class metodunun cagirilmasini saglamak lazim.

```html
  <form [formGroup]="productAddForm" (ngSubmit)="add()">
```

**productAddForm** component class inda `FormGroup` tipinde class property si olarak tanimlanmis olmalidir. Submit islemi icin de class da method eklenmis olmalidir.

Simdi ise biraz css ler, `form-group`, `form-control`

Sonra yine bir div icinde input ve validation sorunu olunca hatayi gosterecegimiz baska bir div olusturuyoruz.

Bir hata aldik, cunku `ReactiveFormModulde` unun eklenmesi lazim project e, onu da `app.module.ts` de ekliyoruz. Bu hatayi, `[formGrup]="productAddForm"` assignment indan sonra aldik. Cunku `formGroup` property si, `ReactiveFormModulde` ile kullanilabilir oluyor.

Ayrica routing i de duzeltmemiz lazim. Onu da `app-routing.module.ts` de yapiyoruz. Cunku `ReactiveForm` ile product ekle butonuna basinca yeni yazilan component a gitmesi icin.

```html
  <h3>Yeni Urun Ekle - Reactive</h3>
  <form [formGroup]="productAddForm" (ngSubmit)="add()">
  <div class="form-group">
      <input type="text" id="name" formControlName="name" class="form-control" placeholder="Urun Adi">
      <div class="alert alert-danger" *ngIf="productAddForm.get('name').hasError('required') && productAddForm.get('name').touched">Urun zorunludur</div>
  </div>
  </form>
```

Simdi bu kod u inceleyelim:

- Form u component class indaki formGroup object i ile iliskilendirme icin, `<form [formGroup]="productAddForm" ...` ile yapiyoruz
- Submit action i icin ise classic yontemde oldugu gibi, parametreye gerek yok cunku onu `formGroup` uzerinden alicagiz. `(ngSubmit)="add()"` de hallediyoruz.
- Component daki *formGroup* un icindeki object property name ini *formControlName* ile veriyoruz. Bu sekilde html tarafi ile class tarafi iliskilendirilmis oldu. Iki tane form olmadigindan ki olsa bile hangi form un icindeyse o form un icindeki name object ini alir.
  
```html
  <input type="text" id="name" formControlName="name" class="form-control" placeholder="Urun Adi">
```

- Validation hatasi olunca ekrana bilgilendirme yapmak icin ise yine bir div olusturuyoruz. Eski yapiyla buyuk olcude ayni ama bu kere validation yaparken *ngIf* expression i biraz farkli. `*ngIf="productAddForm.get('name').hasError('required') && productAddForm.get('name').touched"`. Yani bu kere angular tarafindaki **productAddForm** undan value aliyoruz, get method u ile. bunun required error u var mi diye bakiyoruz, ve de touched mi diye bakiyoruz.

Bu kadar. Geri kalan property ler icin de ayni islemleri yapiyoruz.

Category ve button icin;

- CategoryService ini import ediyoruz, dikkat et local olsun, yani providers icine yazilmasi gerekiyor
- Sonrasinda Category array cinsinde bir tane class property si tanimliyoruz. Bunu da server ngOnInit method unda dolduruyoruz, CategoryService ini kullanarak.
- Sonrasinda ise html tarafinda ayni eskisi gibi bir *html select* tag i kullanicaz, icinde bir tane *html option* tag i olmasi yeterli. Bu option tag ini cogullayacaz. **formControlName** olarak select tag ini kullanicaz. Cunku *option* dan gelicek olan value yu o tutacak, onu da *categoryId* ye assign edicez. Genel olarak bu kadar, bi de html id ve name property lerini verebiliriz. Bir de her field icin yaptigimiz gibi eger field requirement lerine uymayinca bir div icerisinde error response unu donmemiz lazim:

```html
    ...
    <div class="form-group">
        <select class="form-control" formControlName="categoryId" required id="categoryId" name="categoryId">
          <option *ngFor="let category of categories" [value]="category.id">{{category.name}}</option>
        </select>
        <div *ngIf="productAddForm.get('categoryId').hasError('required') && productAddForm.get('categoryId').touched" class="alert alert-danger">
          Urun kategorisi boş bırakılamaz
        </div>
    </div>
    ...
```

Burada onemli olan ise, validation inin component tarafinda yapilmasindan sonra alert basacagimiz div in if method unda nasil error basildigini yakalamak. Onu da form object i uzerinden get ile object ini alarak basliyoruz, sonrasinda ise hasError method uyla check ediyoruz, o kadar.

Baska bir onemli nokta ise option html tag inin value sunun nasil verildigi, onu da `[value]` ile veriyoruz. Bu property assignment olarak geciyor.
Ayni islemi daha uzun sekilde yapabiliriz; `value = "{{category.id}}"`

Simdi ise product u ekleyelim.

- Ondan once alerify service ini ekleyelim, alerify service i global oldugundan direk inject edersek yeter. *providers* kismina gerek yok. Onu sonra da add method unda kullandik.
- Sonra ProductService inin import edilmesi lazim. Onu da local olarak yapalim.

Yukaridakilere ek olarak, validation islemini yaparken, angular form objectinin control lerinden yararlanabiliriz. Anlasilmasi daha kolay birsey olabilir.

```html
    ...
    <div class="alert alert-danger" *ngIf="getFormControl.price.errors && getFormControl.price.errors.required && getFormControl.price.touched">
        Urun Fiyati zorunludur</div>
    ...
```

```typescript
    ...
      get getFormControl() {
        return this.productAddForm.controls;
    }
    ...
```

## Login Islemleri icin Component Olusturulmasi

Urunu ekeleyebilmek icin oncelikle login olmasi gerekir, onun icin login sayfasi yazmamiz lazim oncelikle, sonrasinda ise application uzerindeki islemler icin yetkilendirme yapilabilir.

Login sayfasi icin;

- Component i olustur, tabii `app` folder i altinda:

> ng g component login

- Ilk olarak route a ekleme yapalim;
  - `app-routing-module.ts` deki routes constant ina eger biri login path i ile gelirse onu login component ina yonlendir dememiz lazim.
  - Sonrasinda bu route linkini call edecek bir link tanimlama, `app.component.html` de, sonra sign out u bul, onun yerine login olarak degistir bunu router link ini de degistir, login e gitsin,

```html
    ...
        <li class="nav-item text-nowrap">
            <a class="nav-link" routerLink="/login">Login</a>
        </li>
    ...
```

Html formlarini olusturabilmek icin bootstrap den `floating-labels` e git, oradaki login sayfasinin kopyala. Sayfa kaynagini goster, form un kapanisina kadar kopyala, login.component.html e yapistir, oradaki css i de ilgili css dosyasina yapistir. login.component.css

Artik ekran ayni sayfayi ekranda gorebilirsin.
Sonra bazi temizlikleri yap html uzerinde
Remember me yi kaldir. Simdilik o yetenegimiz yok.

## Linklere Yetkilendirme Yapmak: Guard

Daha once de soyledigimiz gibi, bir islem yapicaz ama login oldun mu demek icin **Guard** lari kullaniyoruz, yani product ekliyecen ama sen login oldun mi hatta, o sayfayi gormek icin bile login olman gerekebilir vb. kurallari eklemek ve uygulamak icin Guard lari kullnicaz.

Ilk olarak **LoginComponent** i icinde **Guard** i yazmamiz gerekiyor. Cunku onun icin **Guard** ekliycez.
Login component i icerisinde, bir file olusturuyoruz, `login.guard.ts`

Sonra yeni file icine bir class yaziyoruz ismi de `LoginGuard` olsun.
Bu class `CanActivate` interface ini implement etmeli, `angular/router` dan import edilmelidir. Bunu implementation method u vardir, unu yap. kendisi eklediginde optional olarak cok sey return ediyor, onlari siliyoruz.

Bir de **Guard** lar service gibi calisirlar, o zaman **Injectable decorerator** ini eklememiz gerekiyor. O da `angular/core` dan import ediyoruz. Sonrasinda bu service i `app-module.ts` e eklememiz lazim. providers kismina cunku global ulasilabilen bir service olmasi daha iyi olur.

Simdi unimplemented method kisminina gelelim, method un ismi **canActivate** icine ise **iki tane parametre** aliyor, bir tanesi *(route) ActivatedRouteSnapshot* ki bu next step de active olucak route bilgilerini tutuyor, ikincisi ise **(next) RouterStateSnapshot** o da simdiki route bilgilerini tutuyor, bu method un **boolean** donmesi gerekiyor.

Bu **guard** in user in login olup olmadigini bilmesi icin aslinda **localStorage** dan bilgisine bakabilir veya *AccountService* service uzerinden isLoggedIn method una bakabilir. Service uzerinden islem yapmak daha mantikli cunku localStorage degistirilebilir, login olmasan bile.

Eger login olunmamissa login sayfasina yani component ina route edilmeli. Onun icin bir class a ihtiyacimiz var o da: Router class i. onu da inject ediyoruz. bir service gibi degil tam olarak kendisi global bir object. o da angular/router altinda yer aliyor.

Kodlar;

- `login.guard.ts`:

```typescript
...
@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let loggedIn = this.accountService.isLoggedIn()
        if (loggedIn) {
            return true; // pass the guard
        }
        this.router.navigate(['login']); // login component inin cagirilmasi
        return false;
    }
}
```

Simdi ise guard i nasil kullanicagimizi veriyoruz. Bunu yaparken `app-routing.module.ts` dosyasinda hangi rooute a guard vermek istiyorsak ona guard i ekliyoruz

```typescript
    ...
    { path: 'product-add-1', component: ProductAddClassicFormsComponent },
    ...

    bunu su sekilde  update ediyoruz mesela;

    ...
    { path: 'product-add-1', component: ProductAddClassicFormsComponent, canActivate:[LoginGuard]},
    ...
```

Yani bir object name ve icine ise bir array seklinde verilecek guard lari sirasyila ekliyoruz. Array cunku bir route a birden fazla guard verilebilir. Buradaki siralama da onemlidir.

## Artik Login Olalim

`login.component.html` deki html input larinin component.ts ile iliskilendirilmesi gerekiyor. Bunu klasik form uygulamasi ile yapabiliriz.

Product daki gibi yap, onu copy paste yapailirsin.

Login form ismi vermen lazim.

Add yerine loginForm verebilirsin.

Kullanici adi olarak degistir email address ini.

Burada bir html tarafindaki form icindeki input field lar icin html name attribute unu vermen gerekiyor. yoksa exception aliyoruz.

```html
...
<form class="form-signin" #productAddForm="ngForm" (ngSubmit)="add(productAddForm)">
    <div class="form-label-group">
        <input #name="ngModel" [(ngModel)]="model.name" type="text" id="inputUserName" name="inputUserName" class="form-control" placeholder="Kullanici Adi" required autofocus>
        <label for="inputUserName">Kullanici Adi</label>
    </div>

    <div class="form-label-group">
        <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Sifre" #password="ngModel" [(ngModel)]="model.password" required>
        <label for="inputPassword">Sifre</label>
    </div>

    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2019</p>
</form>
...
```

Hatirlatma amacli, class ile html arasindaki iliskiyi surada kuruyoruz: `[(ngModel)]="model.name"`

Yani name isminde bir html input olusturuyorsun, onu da component daki model object inin name property sine assign ediyorsun, o kadar.

Submission icin ise bir tane submit butonu koyuyorsun, sonrasinda ise buna basilinca form uzerindeki ngSubmit ile verilen method call ediliyor.

Bunun reactive halini de hazirlayabilirsin.

Simdi component tarafinda login method unu yazalim. 

Login component da ise bizim AccountService inin olmasi gerekiyor, onu provider olmadan inject et, zaten global tanimlamistik. provider a yeniden yazmamamiz lazim.

AccountService uzerinden login method unu call et, ona da this.model i ver, model object i user i barindiriyordu.

## Login ve Logout Butonunun Olusturulmasi

Login butonu `app.component.html` deydi, simdi onu mantiksal olarak eger user giris yapmamissa login, giris yapmissa logout a cevirmemiz lazim. onu yapmak da kolay, `app.component.ts` de AccountService ini inject edeririz eger user login ise signout, login degilse sign in ederiz. bu kadar.

`ng template` ile de yapabilirsin;

```html
    <li class="nav-item text-nowrap">
        <a *ngIf="!isUserLoggedIn(); else showLogoutLink" class="nav-link" routerLink="/loginReactive">
          Sign in
        </a>
        <ng-template #showLogoutLink>
            <a class="nav-link" (click)="signOut()" routerLink="products">Sign Out</a>
        </ng-template>
    </li>
```

## Reactive Login Component i Olusturma

Ilk olarak `app/src` nin altina bir tane login folder i yaratiyoruz, klasik login form olacak sekilde bir component olusturalim ve yukarida yazdigimiz component i bunun icine tasiyalim. Hatalari cozerlim. Calistigindan emin olalim.

Sonrasinda ise login folder i altinda reactive login component ini yaratalim.

Simdi ilk olarak bunun route isini halledelim, `app-routing.component.ts` file inda
ekrani gorduk, sonrasinda bootstrap den bul hallet yeni component in html ini ve css ini

Simdi reactive product eklemeye bakarak login formu olusturalim;

FormBuilder i inject ediyoruz ve FormGroup class property si olusturuyoruz.
ngOnInit method unda FormBuilder ile FormGroup object ini olusturuyoruz. Olustururken ise alacagimiz input larin isimlerini ve validation larini ekliyoruz.

Kabaca, class kisimi tamamdir, sonrasinda html kismini olusutralim;

```html
<form [formGroup]="loginForm" class="form-signin" (ngSubmit)="login()">
    <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
    </div>

    <div class="form-label-group">
        <input formControlName="userName" type="text" id="idUserNameHtml" name="userNameHtml" class="form-control"
            placeholder="User Name" required autofocus>
        <label for="userName">User Name</label>
    </div>

    <div class="form-label-group">
        <input formControlName="password" name="userPasswordHtml" type="password" id="inputPassword"
            class="form-control" placeholder="Password" required>
        <label for="inputPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted text-center">&copy; 2021-2022</p>
</form>
```

Sonrasinda ise class tarafinda submit isleminin yapilmasidir.

## Bir Prodcut u Sayfada Gostermek

Ilk olarak bir tane product i view etmek icin bir html ve component yazmamiz lazim. Yeni bir tane yaratiyoruz. O da product folder i icinde olsuin

> ng g component prodcut-details

Buna bir tane route verelim. O da produts dan sonra bir produc id si ile olsun.

```typescript
...
{ path: 'products/:productId', component: ProductDetailsComponent },
...
```

Sanirim bu isimizi gorur sonrasinda ise gelen id yi yakalamak icin ActivatedRoute u kullanmamiz lazim.

Yukarda da soyledigimiz gibi url deki parametereleri alabilmek icin ActivatedRoute u kullanicagiz, bunun kullanimi da oldukca basit, normal bir service kullanir gibi bir object i component a inject edicegiz, sonrasinda ActivatedRoute object inin params property sine subscribe olacagiz, degisikliklerden haberdar olmak icin. (Observable mimarisi). Bu islemi ise ngOnInit method unda yapicaz:

Simdi ise details deki urunu bir cart a eklememiz lazim. Onu icin oncelikle bir tane cart service i yazalim. cart islerini icinde tutabiliriz.
Daha onceside ise bir tane cart component i yazalim, o da cart islerini gorecek.
Bu component icine cartItem adinda bir class yazalim, bizim cart elamlarini ve quantity lerini tutacak.
Simdi ise bir tane cart item listesi create edip hard coded sekilde onu load edelim cart component inda. sonrasinda cart component icin de bir gorsellik ayarlayalim bootstrap den.

## Product a Tiklayarak Product Details Goruntulenmesi

Bunu yapabilmek icin sadece product component sayfasindaki img element ine routerLink attribute unun eklenmesi lazim. `<img ... routerLink="/products/{{product.id}}">`

Ayrinti bir nokta, **routerLink** `/` ile baslamalidir, onu eklemezsek, icinde bulundugu context uzerine ekleme yapiyor. Ornegin, bu durumda `/` i kaldirirsak, `<img ... routerLink="products/{{product.id}}">`. Bir image a tiklarsak, aranacak url su olacak; /products/prodocts/12

## Sepet Gelistirmesi

Ilk olarak, product larin altindaki sepete ekle butonuna tiklayinca, bunlarin genel bir object e eklenmesini saglamaliyiz.
Bunun icin ilk olarak cart icindeki bir element i temsil edecek bir cart class i. Sonra da cart icindeki itemlari tutacak bir liste tanimlalamiz lazim.

Bir tane cart folder i oluturuyoruz. Cunku bu iki class o folder icinde olmali, ayrica bu folder da cart component i de tanimlayacagiz.

Bir de cart islemlerini yonetebilecegin bir service yazalim, bu sekilde cartItems a sadece bu service uzerinden degisiklik yapicagiz. Daha moduler bir code olacak.
