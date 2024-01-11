export const enValidation = {
  name: {
    presence: {
      message: '^Please enter your Name',
    },
  },
  reps:{
presence:{
  message:'^Please enter reps'
},

  },
  equipmentName:{
    presence:{
      message:'^Please enter equipmentName'
    },
  },
  category:{
    presence:{
      message:'^Please select equipment category'
    },
  },
  task_comments:{
    presence:{
      message:'^Please enter comment'
    },
    
      },
      question:{
        presence:{
          message:'^Please enter question, concern or feedback'
        },
      },
  

  task_requirementError:{
    presence:{
      message:'^Please enter task_requirementError'
    },
 
      },
      feedback:{
    presence:{
      message:'^Please enter feedback'
    },},
    reason:{
      presence:{
        message:'^Please enter reason'
      },},
  lebs:{
    presence:{
      message:'^Please enter lebs and reps'
    },
    
      },
      
  sms: {
    presence: {
      message: '^Please enter your message',
    },
  },
  Fname: {
    presence: {
      message: '^Please enter an First Name',
    },
  },
  Lname: {
    presence: {
      message: '^Please enter an Last Name',
    },
  },
  firstName: {
    presence: {
      message: '^Please enter an First Name',
    },
  },
  lastName: {
    presence: {
      message: '^Please enter an Last Name',
    },
  },
  email: {
    presence: {
      message: '^Please enter an email address',
    },
    email: {
      message: '^Please enter a valid email address',
    },
  },

  password: {
    presence: {
      message: '^Please enter a password',
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters',
    },
  },
  passwordO: {
    presence: {
      message: '^Please enter an old password',
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters',
    },
  },
  oldPassword: {
    presence: {
      message: '^Please enter an old password',
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters',
    },
  },
  newPassword: {
    presence: {
      message: '^Please enter new password',
    },
    length: {
      minimum: 6,
      message: '^Your New Password must be at least 6 characters',
    },
  },
  passwordC: {
    presence: {
      message: '^Please Re-enter New Password',
    },
    length: {
      minimum: 6,
      message: '^Your Password must be at least 6 characters',
    },
  },
  passwordN: {
    presence: {
      message: '^Please enter new password',
    },
    length: {
      minimum: 6,
      message: '^Your Password must be at least 6 characters',
    },
  },
  cPassword: {
    presence: {
      message: '^Please enter a confirm password',
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters',
    },
  },
  phone: {
    presence: {
      message: '^Please enter a phone number',
    },
    length: {
      minimum: 11,
      message: '^Your phone no must be at least 11 number',
    },
  },
  Cardnumber: {
    presence: {
      message: '^Please enter a Cardnumber',
    },
    length: {
      minimum: 16,
      maximum: 16,
      message: '^Your Card no must be at 16 number',
    },
  },
  Comments: {
    presence: {
      message: '^Please enter an Comments',
    },
  },
  Files: {
    presence: {
      message: '^Please Select Files',
    },
  },
  issue: {
    presence: {
      message: '^Please Select Orthopedic Issue',
    },
  },
  Nameoncard: {
    presence: {
      message: '^Please enter an Nameoncard',
    },
  },
  Cardname: {
    presence: {
      message: '^Please enter an card holder name',
    },
  },
  cpassword: {
    presence: {
      message: '^Please enter a confirm password',
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters',
    },
  },
  DateOfBirth: {
    presence: {
      message: '^Please enter your Date of Birth',
    },
  },
  Expirydate: {
    presence: {
      message: '^Please enter your Expiry Month',
    },
    length: {
      minimum: 2,
      maximum:2,
      message: '^Your Expiry Month must be at 2 digit',
    },
  },
  ExpiryYear: {
    presence: {
      message: '^Please enter your Expiry year',
    },
    length: {
      minimum: 4,
      maximum:4,
      message: '^Your exxpiry year must be at 4 digit',
    },
  },
  
  CVV: {
    presence: {
      message: '^Please enter your CVV',
    },
    length: {
      minimum: 3,
      maximum:3,
      message: '^Your CVV must be at 3 digit',
    },
  },
  npi: {
    presence: {
      message: '^Please enter your NPI Number',
    },
    length: {
      minimum: 4,
      maximum:4,
      message: '^Your exxpiry year must be at between 4 digit',
    },
  },
  about: {
    presence: {
      message: '^Please enter about yourself',
    },
  },
  languages: {
    presence: {
      message: '^Please enter languages',
    },
  },
  specialty: {
    presence: {
      message: '^Please enter your specialty',
    },
  },
  specialtyExperience: {
    presence: {
      message: '^Please enter your experince',
    },
  },
  practiceNames: {
    presence: {
      message: '^Please tell about your practices',
    },
  },
  educationDetails: {
    presence: {
      message: '^Please enter your education',
    },
  },
  hospitalAffiliations: {
    presence: {
      message: '^Please enter your Hospital Affiliations',
    },
  },
  Securitycode: {
    presence: {
      message: '^Please enter Security code of card',
    },
  },
  
  height: {
    presence: {
      message: '^Please enter your height',
    },
  },
  weight: {
    presence: {
      message: '^Please enter your weight',
    },
  },
  fullname: {
    presence: {
      message: '^Please enter your full name',
    },
  },
};
