
export const statsViewData = {
  Date : (new Date()),
  PatientID : 'A123123',
  City: 'Los Angeles',
  State: 'CA',
  WillbeingIndex: 87,
  YesterdayWellbeingIndex: 75,
  TomorrowWellbeingIndex: 90,
  EnvironmentalQualityIndex: 84,
  panels : [
    {
      title : 'Wellbeing and QoL',
      highlightLabel : '',
      highlightMeasure : '',
      measures : [
        {
          title : 'Wellbeing',
          twoWeeksData : [ 44, 30, 45, 44, 48, 52, 50, 49, 49, 55, 52, 51, 53, 52 ]
        },
        {
          title : 'QoL',
          twoWeeksData : [ 54, 43, 45, 52, 51, 55, 56, 59, 54, 55, 58, 61, 63, 62 ]
        } 
      ]
    }
  ]
}