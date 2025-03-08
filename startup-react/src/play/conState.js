export class ConState {
    static Unknown = new ConState('unknown');
    static Connected = new ConState('connected');
    static Unconnected = new ConState('unconnected');

    constructor(name) {
        this.name = name;
    }
}
