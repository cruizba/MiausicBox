import { Instrument } from './Instrument'

/**
 * Class that represent the information related to MiausicBox instruments
 * @class InstrumentList
 */
export class IntrumentList{

  private _instruments: Instrument[] = [
    new Instrument("Voz", "../img/instrumentoVozN.png"),        // 0
    new Instrument("Guitarra", "../img/instrumentoGuitarN.png"),   // 1
    new Instrument("Bajo", "../img/instrumentoBajoN.png"),       //2
    new Instrument("Bateria", "../img/instrumentoBajoN.png"),    //3
    new Instrument("Violin", "../img/instrumentoViolinN.png"),     //4
    new Instrument("Trompeta", "../img/instrumentoTrompetaN.png"),   //5,
    new Instrument("Piano", "../img/instrumentoPianoN.png"), //6
    new Instrument("Otros", "../img/instrumentoOtroN.png")       //7
  ];

  get instruments():Instrument[]{
    return this._instruments;
  }
  
}
