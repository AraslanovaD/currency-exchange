import { makeAutoObservable } from "mobx";

const storageKey = 'currencyExchange'

class currencyPairsStore {
    currencyPairs: {
        index: number,
        from: string, fromValue: number, fromNominal: number,
        to: string, toValue: number, toNominal: number
    }[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    saveLocalStorage = () => {
        window.localStorage.setItem(storageKey, JSON.stringify(this.currencyPairs));
    }

    addPair = (pair: {
        from: string, fromValue: number, fromNominal: number,
        to: string, toValue: number, toNominal: number
    }) => {
        let length = this.currencyPairs.length
        let newIndex: number;

        if (length === 0) {
            newIndex = 0;
        } else {
            newIndex = this.currencyPairs[length - 1].index + 1
        }

        let newPair = {
            index: newIndex,
            from: pair.from, fromValue: pair.fromValue, fromNominal: pair.fromNominal,
            to: pair.to, toValue: pair.toValue, toNominal: pair.toNominal
        };
        this.currencyPairs.push(newPair);
        this.saveLocalStorage();
    }

    deletePair = (index: number) => {
        this.currencyPairs.splice(index, 1);
        this.saveLocalStorage();
    }

    swapPair = (index: number) => {
        [this.currencyPairs[index].from, this.currencyPairs[index].to] = [this.currencyPairs[index].to, this.currencyPairs[index].from];
        [this.currencyPairs[index].fromValue, this.currencyPairs[index].toValue] = [this.currencyPairs[index].toValue, this.currencyPairs[index].fromValue];
        [this.currencyPairs[index].fromNominal, this.currencyPairs[index].toNominal] = [this.currencyPairs[index].toNominal, this.currencyPairs[index].fromNominal];
        this.saveLocalStorage();
    }

    calculateCourseExchange = (index: number) => {
        let efrom = this.currencyPairs[index].fromValue / this.currencyPairs[index].fromNominal;
        let eto = this.currencyPairs[index].toValue / this.currencyPairs[index].toNominal;
        return efrom / eto;
    }

    setPairs = () => {
        let storage = window.localStorage.getItem(storageKey);
        if (storage) {
            this.currencyPairs = JSON.parse(storage);
        }
    }

    setDefaultPairs = (courses: object,) => {
        let pair = {
            from: courses["RUB"].Name, fromValue: courses["RUB"].Value, fromNominal: courses["RUB"].Nominal,
            to: courses["USD"].Name, toValue: courses["USD"].Value, toNominal: courses["USD"].Nominal
        };

        this.addPair(pair);

        pair = {
            from: courses["RUB"].Name, fromValue: courses["RUB"].Value, fromNominal: courses["RUB"].Nominal,
            to: courses["EUR"].Name, toValue: courses["EUR"].Value, toNominal: courses["EUR"].Nominal
        };

        this.addPair(pair);
        this.saveLocalStorage();
    }
}

export default new currencyPairsStore();