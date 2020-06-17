//
// Structured data shaped for UI requirements, may be derived from
// flat, denormalized table data...
//
// highlightLabel / highlightMeasure added to accommodate example
// of "Main Pollutant: PM 2.5".  Not yet implemented in app-panel.
//
// The summary (or latest?) measurements that appear in 2-4 boxes
// on the 'collapsed' panels appear to have mixed units of measure, 
// and are not all on a 0-100 scale.  Will this impact the line chart? 
// No work has been done yet to accommodate mixed units and it would
// probably be difficult to design. Hopefully all measures can be
// mapped and presented on a 0-100 scale??? Note that presenting
// units of measure is not accommodated on the collapsed panel yet
// either.  This will not be a problem and we can add 'summary' 
// measurements to the data structure below but I've held up
// and just hacked the panel to pull from the rightmost (today's)
// number (no unit of measure) from the twoWeeksData arrays...
// I didn't want to do additional working especially without being
// certain of the end requirements, so I've just stubbed the UI
// to present the latest data as a start...
//
export const statsViewData = {
  Date: (new Date()),
  PatientID: 'A123123',
  City: 'Los Angeles',
  State: 'CA',
  WellbeingIndex: 94,
  YesterdayWellbeingIndex: 52,
  TomorrowWellbeingIndex: 95,
  EnvironmentalQualityIndex: 88,
  panels: [
    {
      title: 'Wellbeing & Environmental Index',
      highlightLabel: '',
      highlightMeasure: '',
      measures: [
        {
          title: 'Wellbeing',
          twoWeeksData: [44, 30, 45, 44, 48, 52, 50, 49, 49, 55, 52, 51, 53, 52]
        },
        {
          title: 'QoL',
          twoWeeksData: [54, 43, 45, 52, 51, 55, 56, 59, 54, 55, 58, 61, 63, 62]
        }
      ]
    },
    {
      title: 'Physiology',
      highlightLabel: '',
      highlightMeasure: '',
      measures: [
        {
          title: 'Heart Rate',
          twoWeeksData: [44, 44, 48, 52, 50, 49, 49, 55, 52, 51, 53, 52, 30, 45]
        },
        {
          title: 'Stress',
          twoWeeksData: [54, 43, 45, 52, 51, 55, 56, 59, 54, 55, 58, 61, 63, 67]
        },
        {
          title: 'Sleep',
          twoWeeksData: [50, 49, 49, 55, 52, 51, 53, 44, 30, 45, 44, 48, 52, 52]
        },
        {
          title: 'Oxygen',
          twoWeeksData: [56, 59, 54, 55, 54, 43, 45, 52, 51, 55, 58, 61, 63, 62]
        }
      ]
    },
    {
      title: 'Activities',
      highlightLabel: '',
      highlightMeasure: '',
      measures: [
        {
          title: 'Exercise',
          twoWeeksData: [41, 44, 46, 52, 50, 49, 49, 55, 52, 51, 53, 52, 30, 40]
        },
        {
          title: 'Energy',
          twoWeeksData: [54, 43, 45, 52, 51, 55, 56, 59, 54, 55, 58, 61, 63, 60]
        },
        {
          title: 'Calories',
          twoWeeksData: [50, 49, 49, 55, 52, 51, 53, 44, 30, 45, 44, 48, 52, 55]
        },
        {
          title: 'Social',
          twoWeeksData: [56, 59, 54, 55, 54, 43, 45, 52, 51, 55, 58, 61, 63, 59]
        }
      ]
    },
    {
      title: 'Environment',
      highlightLabel: '',
      highlightMeasure: '',
      measures: [
        {
          title: 'Air Quality',
          twoWeeksData: [54, 43, 45, 52, 51, 55, 56, 59, 54, 55, 58, 61, 63, 62]
        },
        {
          title: 'Temp.',
          twoWeeksData: [44, 30, 45, 44, 48, 52, 50, 49, 49, 55, 52, 51, 53, 52]
        },
        {
          title: 'Humidity',
          twoWeeksData: [56, 59, 54, 55, 54, 43, 45, 52, 51, 55, 58, 61, 63, 62]
        },
        {
          title: 'Wind',
          twoWeeksData: [50, 49, 49, 55, 52, 51, 53, 44, 30, 45, 44, 48, 52, 52]
        }
      ]
    }]
}
