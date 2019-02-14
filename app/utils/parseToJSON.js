/**
 * Parse inmutable object to JSON
 */

import { isImmutableObject } from 'utils/immutableHelper';

export default function parseToJSON(obj) {
  let ret = null;
  try {
    if (obj != null) {
      if (isImmutableObject(obj)) {
        // console.log("parseToJSON: is inmutable");
        ret = obj.toJS();
      } else {
        ret = obj;
      }
    }
  } catch (error) {
    // eslint-disable-next-line
    console.error("Obj [" + typeof obj + "] is not parseable: " + JSON.stringify(obj));
    ret = null;
  }
  // console.log("parseToJSON [" + typeof obj + "] ("+JSON.stringify(obj)+") => " + JSON.stringify(ret));
  return ret;
}
