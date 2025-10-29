const mongoose = require('mongoose');
const moment = require('moment');

const warrantySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
  },
  description: { 
    type: String, 
    default: '',
  },
  warrantyType: { 
    type: String,
    default: 'Standard', //'Standard', 'Extended', 'VIP', 'Comprehensive', 'Partial'
    required: true 
  },
  duration: { 
    type: Number,
    required: true, 
  },
  durationUnit: {
    type: String,
    enum: ['tháng', 'năm', 'ngày', 'giờ'],
    default: 'năm',
  },
  coverage: { 
    type: String,
    default: 'Repair',
    required: true 
  },
  terms: { 
    type: String, 
    default: '' 
  },
});

warrantySchema.methods.calculateEndDate = function() {
  let endDate = moment();

  switch (this.durationUnit) {
    case 'years':
      endDate.add(this.duration, 'years');
      break;
    case 'months':
      endDate.add(this.duration, 'months');
      break;
    case 'days':
      endDate.add(this.duration, 'days');
      break;
    case 'hours':
      endDate.add(this.duration, 'hours');
      break;
    default:
      break;
  }

  return endDate.toDate();
};

module.exports = mongoose.model('Warranty', warrantySchema);
