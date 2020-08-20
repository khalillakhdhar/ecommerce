import { Component, OnInit } from "@angular/core";
import { Produitservice } from "../services/produit.service";
import { Produit } from "../classes/produit";
import { Commandeservice } from "../services/commande.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  produits: any;
  public search: any = "";
  query: any;
  constructor(
    public produitService: Produitservice,
    public commandeService: Commandeservice
  ) {}

  ngOnInit(): void {
    this.getproduits();
  }
  getproduits() {
    this.produitService.read_Produits().subscribe((data) => {
      this.produits = data.map((e) => {
        return {
          id: e.payload.doc.id,

          // tslint:disable-next-line: no-string-literal
          titre: e.payload.doc.data()["titre"],
          // tslint:disable-next-line: no-string-literal
          prix: e.payload.doc.data()["prix"],
          // tslint:disable-next-line: no-string-literal
          quantite: e.payload.doc.data()["quantite"],

          // tslint:disable-next-line: no-string-literal
          description: e.payload.doc.data()["description"],
          etat: e.payload.doc.data()["etat"],

          // tslint:disable-next-line: no-string-literal
          photo: e.payload.doc.data()["photo"],
          dt: e.payload.doc.data()["dt"],
          // tslint:disable-next-line: no-string-literal
        };
      });
      console.log(this.produits);
    });
  }
  add(pr) {
    let p = Object.assign(pr);
    p.id_vd = localStorage.getItem("user");
    this.commandeService.create_NewCommande(p);
    window.location.replace("cart");
  }
}
