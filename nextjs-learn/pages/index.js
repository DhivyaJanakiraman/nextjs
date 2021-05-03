// import React, { useState, useEffect } from 'react';
import MeetupList from "../components/meetups/MeetupList";
import Dashboard from "../components/meetups/dashboard";
import getESSearchEvents from "../components/meetups/getESSearchEvents";

let query = {
    bool: {
      should: [
        {
          bool: {
            must: [
              {match_phrase: {action: 'ROLE_CHANGE'}},
              {match_phrase: {genericInfo: '{"role":"ROLE_ADMIN"}'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'REVOKE'}},
              {match_phrase: {objectType: 'USER'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'UPDATE'}},
              {match_phrase: {objectType: 'POLICY'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'CHANGE_AUTHOR'}},
              {match_phrase: {objectType: 'DOCUMENT'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'UPDATE'}},
              {match_phrase: {objectType: 'TENANT_SETTINGS'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'ALL_DOC_ACCESS_ENABLE'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'ALL_DOC_ACCESS_DISABLE'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'OPEN'}},
              {match_phrase: {objectType: 'DOCUMENT'}},
              {match_phrase: {assignInfo: 'totalAccess'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {action: 'CLOSE'}},
              {match_phrase: {objectType: 'DOCUMENT'}},
              {match_phrase: {assignInfo: 'totalAccess'}}
            ]
          }
        },
        {
          bool: {
            must: [
              {match_phrase: {objectType: 'NODE'}},
            ]
          }
        },
      ]
    }
  }
const authToken = 'Basic ZGphbmFraXJhbWFuQHZlcmEuY29tOmV5SnphV2R1WVhSMWNtVWlPaUpqV1N0WmNXWkdTbGR2VFRNM0sxSldiMU01VWpkb1NreEJWekJJZFVGck0yMVhWa1JSTlZkQ1FUTmtSaTlKZHpSQlkwdGtjVzlDVmpKT1dsWjNjR3B4VUVWVlRWcDNNell4WkM5eU4xVnpZa1I2SzJOTmNubGxVRkkzWXpsTWMwMXJiMHBFU0RKRVdGQnZNbnBzUnpVeVltWkhObGRyZFZOSk9ESlljRXBRY0RadlNFbDVaVlZJTjA1WGRFdElWMFE0ZUV4aFJEVk1UM2hYUkV4WmMyeFpSbFo0WjFwbVNHMUphVTA5SWl3aWRtVnljMmx2YmlJNklsWXhJbjE4WkdwaGJtRnJhWEpoYldGdVFIWmxjbUV1WTI5dGZHUXpaVEF6WWpJeUxUTTJZamN0TkdVek5TMWlaVFk0TFdFNE5qaGxPR1F3T0RobE5Id3hOakU1TnprM01URTFNVFU0ZkZWVFJWSjhVazlNUlY5QlJFMUpUbnd0TlRJd01qRTROVE0zTkRjNE9EUTROVEV6ZkRFMk1UazNNVEEzTVRVeE5UaDhkSEoxWlh4dWRXeHNmR0YzWkVORVRubFRTMVZzUlV0UFNqVTFlblpyWkdrM1F5dFBSbXg1VmpreVJVRkJWVzR5VkU1eU0zQTRXVTlPWVhKVVowUnNTMnBFVVhGQ04xbFRWRlV4VFdJNWVWaHNlRTlNWW14d1QwOWpRMU0wTmpaQ1JsZElObE5IZDJac05VbzJNMmhPT1cxclEzVTRaRk54ZGpsQ2NsY3hVVzltWlM5V2RqVmpVRTlXY0dSbGFVbzBhRTFUWVRKMlRHOWlaMUJEZURkclRVUjJTMmw0TWl0MFpFZzVORWh4V21kc1EzVXdPRDA=';
let config = {
    method: 'GET',
    headers: new Headers({
        'Authorization': authToken
    })
}
var sorting = {};
sorting['time'] = {order: 'desc'};
let bodyData = JSON.stringify({
    size: 25,
    sort: sorting,
    query: query
})

let esConfig = {
    method: 'POST',
    headers: new Headers({
        'Authorization': authToken,
        'content-type': 'application/json'
    }),
    body: bodyData
}
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
    address: "1234 Abcd St, MA, 90987",
    description: "This is the first meetup",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image: "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
    address: "36712 Abcd St, MA, 90987",
    description: "This is the second meetup",
  },
];

function HomePage(props) {
//   const [loadedMeetups, setLoadedMeetups] = useState([]);
//   useEffect(() => {
//     // send http req
//     setLoadedMeetups(DUMMY_MEETUPS);
//   }, []);
//   return <MeetupList meetups={loadedMeetups}></MeetupList>;
// return <MeetupList meetups={props.meetups}></MeetupList>;
return <Dashboard allData={props}/>
}

export async function getStaticProps() {
    // this code will never get executed in the client side. it is executed during the build process.
    // fetch data from an api/database/files from fileSystem
    
    const userCount = await fetch('https://dhivya3.veraeng.com/api/user/all/count', config).then(res => res.json());
    const groupsCount = await fetch('https://dhivya3.veraeng.com/api/group/all/count', config).then(res => res.json());
    const filesCount = await fetch('https://dhivya3.veraeng.com/api/doc/all/seq?numRowsPerPage=1&objectType=DOC', config).then(res => res.json());
    const alertsData = await fetch('https://dhivya3.veraeng.com/api/es/event/_search?mode=TENANT_ADMIN', esConfig).then(res => res.json()).then(data => data.hits.hits)
       
    const refinedAlertsData = getESSearchEvents(alertsData);

    return {
        props: {
            filesCount: filesCount.totalCount,
            usersCount: userCount.count,
            groupsCount: groupsCount.count,
            alertsData: refinedAlertsData
        },
        revalidate: 20 // will be regenerated on the server every 30 seconds
    }
}

// alternative function to getStaticProps

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // will not run during the build process. It will run in the server side after the deployment
//     // fetch data from API/DB/file system
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//         // revalidate: 10// does not make sense to add here since this function is executed for every request
//     }
// }

export default HomePage;
