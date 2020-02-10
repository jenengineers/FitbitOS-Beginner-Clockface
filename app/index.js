import clock from "clock"; //imports the clock functionalities (see line 9)
import document from "document"; //accesses the labels used to display values
import { preferences } from "user-settings"; //gets user preferences
import * as util from "../common/utils"; //imports utility library
import { battery } from "power"; // import battery level (see line 32)
import userActivity from "user-activity"; //adjusted types (matching the stats that you upload to fitbit.com, as opposed to local types)
import { HeartRateSensor } from "heart-rate"; // import HR reading from sensor (see line 52)

//****Clock*****//

      // Update the clock every minute
      clock.granularity = "minutes";

      // Get a handle on the <text> element
      const clockLabel = document.getElementById("clockLabel");
      const clockShadow = document.getElementById("clockShadow")

      // Update the <text> element every tick with the current time
      clock.ontick = (evt) => {
        let today = evt.date;
        let hours = today.getHours();
        if (preferences.clockDisplay === "12h") {
          // 12h format
          hours = hours % 12 || 12;
        } else {
          // 24h format
          hours = util.zeroPad(hours);
        }
        let mins = util.zeroPad(today.getMinutes());
        clockLabel.text = `${hours}:${mins}`;
        clockShadow.text = `${hours}:${mins}`;
      }
      
//****battery*****//
      
        const batteryHandle = document.getElementById("batteryLabel")

        //Measure Battery
        let batteryValue = battery.chargeLevel;

        //Assign battery value
        batteryHandle.text = `${batteryValue} %`;

//****Steps*****//

        const stepsHandle = document.getElementById("stepsLabel");

        let stepsValue = (userActivity.today.adjusted["steps"] || 0); // steps value measured from fitbit is assigned to the variable stepsValue
        let stepsString = stepsValue + ' steps'; // I concatenate a the stepsValue (line above) with th string ' steps' and assign to a new variable
        stepsHandle.text = stepsString; // the string stepsString is being sent to the stepsHandle set at line 15

//****Heart Rate*****//

        const heartrateHandle = document.getElementById("heartrateLabel");

        const hrm = new HeartRateSensor();
        hrm.onreading = function() {
          heartrateHandle.text = `${hrm.heartRate} bpm`; // the measured HR is being sent to the heartrateHandle set at line 16
        }
        hrm.start();
