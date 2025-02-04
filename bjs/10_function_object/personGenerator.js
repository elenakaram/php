const personGenerator = {
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
    "count": 10,
    "list": {
            "id_1": "Алла",
            "id_2": "Елена",
            "id_3": "Ольга",
            "id_4": "Арина",
            "id_5": "Оксана",
            "id_6": "Татьяна",
            "id_7": "Марина",
            "id_8": "Надежда",
            "id_9": "Светлана",
            "id_10": "Елизавета"
        }
    }`,
    professionJson: `{
    "count": 10,
    "list": {
            "id_1": "учитель",
            "id_2": "писатель",
            "id_3": "продавец",
            "id_4": "поэт",
            "id_5": "тракторист",
            "id_6": "журналист",
            "id_7": "артист",
            "id_8": "портной",
            "id_9": "летчик",
            "id_10": "директор"
        }
    }`,

    monthsJson: `{
    "count": 12,
    "list": {
            "id_1": "январь",
            "id_2": "февраль",
            "id_3": "март",
            "id_4": "апель",
            "id_5": "май",
            "id_6": "июнь",
            "id_7": "июль",
            "id_8": "август",
            "id_9": "сентябрь",
            "id_10": "октябрь",
            "id_11": "ноябрь",
            "id_12": "декабрь"
            }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',


    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),


    randomValue: function (json) {
        const obj = JSON.parse(json);        
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    // Generate person's gender
    randomGender: function () {

        return this.randomIntNumber() ? this.GENDER_MALE : this.GENDER_FEMALE
    },

    // Generate random fist name according to the person's gender
    randomFirstName: function () {

        return this.person.gender === this.GENDER_MALE ? this.randomValue(this.firstNameMaleJson) : this.randomValue(this.firstNameFemaleJson);
    },

    // Parse firstNameMaleJson once
    getMaleNamesList: function () {

        return JSON.parse(this.firstNameMaleJson).list;
    },

    // Generate person random patronym according to the  person's gender
    randomPatronymic: function () {

        const suffix1 = ['ович', 'овна'];
        const suffix2 = ['евич', 'евна'];
        const suffix3 = ['ич', 'ична'];
        const suffix4 = ['йлович', 'йловна'];
        const patronym = this.getMaleNamesList();

        this.person.patronymic = this.randomValue(this.firstNameMaleJson);
        
        // Handle suffixes for patronyms according to the person's gender
        if (this.person.patronymic === patronym.id_7) {

            return `${this.person.patronymic.slice(0, 4) + (this.person.gender === this.GENDER_MALE ? suffix4[0] : suffix4[1])}`
        }

        else if (this.person.patronymic === patronym.id_6) {

            return `${this.person.patronymic.slice(0, 5) + (this.person.gender === this.GENDER_MALE ? suffix3[0] : suffix3[1])}`
        }

        else if (this.person.patronymic === patronym.id_5 || this.person.patronymic === patronym.id_10) {

            return `${this.person.patronymic.slice(0, -1) + (this.person.gender === this.GENDER_MALE ? suffix2[0] : suffix2[1])}`
        }

        else {

            return `${this.person.patronymic + (this.person.gender === this.GENDER_MALE ? suffix1[0] : suffix1[1])}`
        }
    },

    // Return person random gender
    randomSurname: function () {

        return this.person.gender === this.GENDER_MALE ? this.randomValue(this.surnameJson) : `${this.randomValue(this.surnameJson)}а `;
    },

    // Parse monthsJson once
    getMonthsList: function () {

        return JSON.parse(this.monthsJson).list;
    },

    // Helper function to check if it's a leap year
    isLeapYear: function (year) {

        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    },

    // Function to generate a random date of birth
    randomBirthYear: function () {

        const months = this.getMonthsList();
        this.yearOfBirth = this.randomIntNumber(1956, 2004);
        this.monthOfBirth = this.randomValue(this.monthsJson);
        let daysInMonth;
    
        // Handle February
        if (this.monthOfBirth === months.id_2) {
            daysInMonth = this.isLeapYear(this.yearOfBirth) ? 29 : 28;
        }
        // Handle months with 30 days
        else if (this.monthOfBirth === months.id_4 || this.monthOfBirth === months.id_6 || this.monthOfBirth === months.id_9 || this.monthOfBirth === months.id_11) {
            daysInMonth = 30;
        } 
        // Handle months with 31 days
        else {
            daysInMonth = 31;
        }
        // Set random date based on days in the month
        this.dateOfBirth = this.randomIntNumber(1, daysInMonth);

        // Adjust the month name suffix
        if (this.monthOfBirth === months.id_3 || this.monthOfBirth === months.id_8) {
            this.monthOfBirth += "a"; // for March and August
        } 
        else {
            this.monthOfBirth = this.monthOfBirth.slice(0, -1) + "я"; // for other months
        }
        // Return formatted birthdate
        this.yearBirth = `${this.dateOfBirth} ${this.monthOfBirth} ${this.yearOfBirth}`;

        return this.yearBirth;

    },

    // Parse professionsJson once
    getPrfessionList: function () {

        return JSON.parse(this.professionJson).list;
    },

    // Function to generate a random
    randomProfession: function () {
        const suffix1 = 'ница';
        const suffix2 = 'щица';
        const suffix3 = 'эсса';
        const suffix4 = 'ка';
        const suffix5 = 'иха';
        const suffix6 = 'ца';

        const profession = this.getPrfessionList();

        this.person.profession = this.randomValue(this.professionJson);
        
        // Handle suffixes for profession according to the peron's gender
        if (this.person.profession === profession.id_1 || this.person.profession === profession.id_2) {

            return `${this.person.gender === this.GENDER_MALE ? this.person.profession : this.person.profession + suffix1}`
        }

        else if (this.person.profession === profession.id_3) {

            return `${this.person.gender === this.GENDER_MALE ? this.person.profession : this.person.profession.slice(0, 6) + suffix2}`
        }

        else if (this.person.profession === profession.id_4) {

            return `${this.person.gender === this.GENDER_MALE ? this.person.profession : this.person.profession + suffix3}`
        }

        else if (this.person.profession === profession.id_8) {

            return `${this.person.gender === this.GENDER_MALE ? this.person.profession : this.person.profession.slice(0, 5) + suffix5}`
        }

        else if (this.person.profession === profession.id_9) {

            return `${this.person.gender === this.GENDER_MALE ? this.person.profession : this.person.profession.slice(0, 5) + suffix6}`
        }
        
        // No suffix for the profession
        else if (this.person.profession === profession.id_10) {

            return `${this.person.profession}`
        }

        else {
        // Return formatted profession
            return `${this.person.gender === this.GENDER_MALE ? this.person.profession : this.person.profession + suffix4}`
        }

    },


    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName();
        this.person.patronymic = this.randomPatronymic();
        this.person.surName = this.randomSurname();
        this.person.yearBirth = this.randomBirthYear();
        this.person.profession = this.randomProfession();

        return this.person;
    }
};
