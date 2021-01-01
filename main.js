// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, bases) => {
  return {
    specimenNum: num,
    dna: bases,
    mutate() {
      let index = Math.floor(Math.random() * this.dna.length);
      let oldBase = this.dna[index];

      while (this.dna[index] === oldBase) {
        this.dna[index] = returnRandBase()
      }
    },
    compareDNA(pAequor) {
      let identicals = 0;

      for (let i=0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          identicals++;
        };
      };
      
      let percentage = (identicals / this.dna.length * 100).toFixed(0);

      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common`);
    },
    willLikelySurvive() {
      let identicals = 0;
      this.dna.forEach(element => {
        if (element === 'C' || element === 'G') {
          identicals++;
        };
      });

      return (identicals / this.dna.length) > 0.6;
    }
  };
};

const aequorsThatSurvive = () => {
  let aequors = [];

  while (aequors.length < 30) {
    let num = aequors.length
    let pAequor = pAequorFactory(num, mockUpStrand());

    if (pAequor.willLikelySurvive()) {
      aequors.push(pAequor)
    }
  }

  return aequors;
}

const organism = pAequorFactory(1, mockUpStrand());
const organism2 = pAequorFactory(2, mockUpStrand());
console.log(organism)
// organism.mutate()
console.log(organism.compareDNA(organism2));
console.log(organism.willLikelySurvive());
console.log(aequorsThatSurvive());