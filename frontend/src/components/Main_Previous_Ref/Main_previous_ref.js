import React, { useEffect, useState } from 'react';
import RefBox from './Previous_refs';
import { apiGet } from '../../utils/api-fetch';

function MainPreviousRef(){
    const [refData, setRefData] = useState([])
  const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        getReferral()
          .then(r => r.json())
          .then(r => {
            setRefData(r);
            setIsLoad(true);
          })
      }
    , [])

    if (!isLoad){
      return <div>Loading...</div>;
    } else {
      console.log(refData)
      const prevRefComponents =
<<<<<<< HEAD
        refData.map(refData => <RefBox refTitle={refData.position.title}
                                                                   referred={refData?.referred}
                                                                   referredDesc={refData.position.description}
                                                                   imgUrl={refData?.imgUrl} refStat={refData?.refStat}
                                                                   refStatDesc={refData?.refStatDesc} />)
=======
        refData.map(refData => <RefBox  refTitle={refData.position.title}
                                        referred={refData?.referred}
                                        referredDesc={refData?.referredDesc}
                                        imgUrl={refData?.imgUrl} refStat={refData?.refStat}
                                        refStatDesc={refData?.refStatDesc} />)
>>>>>>> 3d83cf3fb37c754b5863e190b2447951766bb1da
      return (
        <React.Fragment>{prevRefComponents}</React.Fragment>
      )
    }
}

async function getReferral() {
  return await apiGet("/referral/get?isRead=0");
}

export default MainPreviousRef;
