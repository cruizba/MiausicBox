import { Instrument } from './Instrument'

/**
 * Class that represent the information related to MiausicBox instruments
 * @class InstrumentList
 */
export class IntrumentList{
  private _instruments: Instrument[] = [
    new Instrument("Voz"),        // 0
    new Instrument("Guitarra"),   // 1
    new Instrument("Bajo"),       //2
    new Instrument("Bateria"),    //3
    new Instrument("Guitarra"),   //4
    new Instrument("Violin"),     //5
    new Instrument("Trompeta"),   //6
    new Instrument("Otros")       //7
  ];

  get instruments():Instrument[]{
    return this._instruments;
  }

}
