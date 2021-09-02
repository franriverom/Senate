let house = document.getElementById("house");
let senate = document.getElementById("senate"); 
const app = Vue.createApp({
    data(){
        return {
            members: [],
            parties: [],
            states: [],
            selection: "",
            tableParams: [],
            republicans: [],
            democrats: [],
            independents: [],
        }
    },
    created(){
        if(senate) {var endPoint= "https://api.propublica.org/congress/v1/113/senate/members.json"}
        if(house) {var endPoint="https://api.propublica.org/congress/v1/113/house/members.json"}
        fetch(endPoint,{method:'GET', headers: {"X-API-Key" : "a3Ootbog4HKZ1J9cvl3vnfkLjqNTvJJLUEI4nXus"}})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Ocurrió un error")
            }
        })
        .then(data => {
         this.members=data.results[0].members
         this.tableParams = [...data.results[0].members.filter(when => when.total_votes !== 0)] 
         this.republicans= [...data.results[0].members.filter(when => when.party == "R")]
         this.democrats= [...data.results[0].members.filter(when => when.party == "D")]
         this.independents= [...data.results[0].members.filter(when => when.party == "ID")]
    })
    },
    methods:{

    },
    computed:{
        membersByState(){
            let repetidos = []
            this.members.map(element => repetidos.push(element.state))
            let theStates = []
            repetidos.sort()
            for (let j = 0; j < repetidos.length; j++) {
                if (repetidos[j] != repetidos[j + 1]) {
                    theStates.push(repetidos[j])
                }
            }
            return this.states = theStates;
        },
        membersByParty(){
            let chequeados = this.members.filter(member => this.parties.includes(member.party) || this.parties.length === 0)
            if(this.selection == "") {
                return chequeados
            } else {
                let seleccionados = chequeados.filter(element => element.state == this.selection)
                return seleccionados
            }
        },
      
        mostAttendance(){
        function mayorAsistencia(array){
        let contarVotos = array.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
        let posicionDiezPct = (contarVotos.length * .1).toFixed(0)
        let arrayAux = []
        for(let i =0; i< posicionDiezPct; i++){
        arrayAux.push(contarVotos[i])
        }
        return arrayAux
       }
        return mayorAsistencia([...this.tableParams]);
    },
        leastAttendance(){
        function menorAsistencia(array){
        let contarVotos = array.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
        let posicionDiezPct = (contarVotos.length * .1).toFixed(0)
        let arrayAux = []
        for(let i =0; i< posicionDiezPct; i++){
        arrayAux.push(contarVotos[i])
        }
        return arrayAux
       }
        return menorAsistencia([...this.tableParams]);
    },
        mostLoyal(){
        function mayorLealtad(array){
        let contarVotos = array.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
        let posicionDiezPct = (contarVotos.length * .1).toFixed(0)
        let arrayAux = []
        for(let i =0; i< posicionDiezPct; i++){
        arrayAux.push(contarVotos[i])
        }
        return arrayAux
       }
        return mayorLealtad([...this.tableParams]);
    },
        leastLoyal(){
        function menorLealtad(array){
        let contarVotos = array.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
        let posicionDiezPct = (contarVotos.length * .1).toFixed(0)
        let arrayAux = []
        for(let i =0; i< posicionDiezPct; i++){
        arrayAux.push(contarVotos[i])
        }
        return arrayAux
       }
        return menorLealtad([...this.tableParams]);
    },
        republicansMembs() {
            function countvotes(array) {
            let arrayVotes = Array.from([...array])
            let pctVotes = []
            arrayVotes.forEach(element => {
                pctVotes.push(element.votes_with_party_pct)
            })
            numberOfVotes = 0
            for (let k =0; k < pctVotes.length; k++) {
                numberOfVotes = numberOfVotes + pctVotes[k]
            } 
            return numberOfVotes
            }
            return countvotes([...this.republicans])
        },
        democratsMembs() {
            function countvotes(array) {
            let arrayVotes = Array.from([...array])
            let pctVotes = []
            arrayVotes.forEach(element => {
                pctVotes.push(element.votes_with_party_pct)
            })
            numberOfVotes = 0
            for (let l =0; l < pctVotes.length; l++) {
                numberOfVotes = numberOfVotes + pctVotes[l]
            } 
            return numberOfVotes
            }
            return countvotes([...this.democrats])
        },
        independentsMembs() {
            function countvotes(array) {
            let arrayVotes = Array.from([...array])
            let pctVotes = []
            arrayVotes.forEach(element => {
                pctVotes.push(element.votes_with_party_pct)
            })
            numberOfVotes = 0
            for (let m =0; m < pctVotes.length; m++) {
                numberOfVotes = numberOfVotes + pctVotes[m]
            } 
            return numberOfVotes
            }
            return countvotes([...this.independents])
        },
    }
})
app.mount("#members-data");
//app.mount("#glance-table")
