import helper from './time';

export default function getESSearchEvents(alertsArr) {
  let allEvents = alertsArr.map(function(event) {
    var e = event._source;
    var username = e.username;
    var text;

    username = 'You';

    let targetUser = e.actionInfo;
    const objectType = e.objectType;
    const deviceName = e.deviceName;
    const assignInfo = e.assignInfo;
    const actionInfo = e.actionInfo;
    const action = e.action;
    const result = e.result;

    // For connector alerts
    let { genericInfo } = e;
    let role;
    let settings = '';

    if (genericInfo) {
      genericInfo = JSON.parse(genericInfo);
    }

    if (objectType === 'NODE') {
      role = genericInfo ? genericInfo.role : '';
    }

    // settings
    for (let key in genericInfo) {
      if (genericInfo[key].newValue) {
        settings += key + ', '
      }
    }
    if (settings) {
      settings = settings.substring(0, settings.length-2);
    }

    switch(e.action) {
      case 'OPEN':
        if(objectType === 'DOCUMENT' && assignInfo.trim() === 'totalAccess') {
          text = `<a href="/users/${e.userId}">${(e.username)}</a> used total file access role to access file <a href="/files/${e.docId}">${(e.docName)}</a> on ${helper.timestampToStandard(e.time)}`;
        }
        break;

      case 'POLICY_ENFORCE':
        // Not being used  due to VERA-29195

        if (e.platform === 'BROWSER' && objectType === 'DOCUMENT') {
          const newFileName = genericInfo && genericInfo.newFileName ? genericInfo.newFileName : e.docName;

          const eventString = `${objectType}_${action}_${actionInfo}_${result}`;
          if (strings[eventString]) {
            text = e.username + ' ' + strings[eventString] + ' ' + newFileName + ' on ' + helper.timestampToStandard(e.time);
          }
        }

        break;
      case 'CHANGE_AUTHOR':
        if(objectType === 'DOCUMENT') {
          text = `<a href="/users/${e.userId}">${(e.assignInfo)}</a>  is now the new owner of <a href="/files/${e.docId}">${(e.docName)}</a> on ${helper.timestampToStandard(e.time)}`;
        }
        break;

      case 'CLOSE':
        if(objectType === 'DOCUMENT' && assignInfo.trim() === 'totalAccess') {
          text = `<a href="/users/${e.userId}">${(e.username)}</a> used total file access role to close file <a href="/files/${e.docId}">${(e.docName)}</a> on ${helper.timestampToStandard(e.time)}`;
        }
        break;

      case 'ALL_DOC_ACCESS_ENABLE':
        if(objectType === 'USER') {
           text = `Total file access role was given to <a href="/users/${e.objectId}">${(targetUser)}</a> on ${helper.timestampToStandard(e.time)}`;
        } else if (objectType === 'ROLE') {
          text = `Enabled total file access for role <a href="/roles/${e.objectId}">${(targetUser)}</a>`;
        } else if(objectType === 'DEVICE') {
          text = `Total Access Device set on ${(deviceName)}`;
        }
        break;

      case 'ALL_DOC_ACCESS_DISABLE':
        if(objectType === 'USER') {
          text = `Total file access role was removed from <a href="/users/${e.objectId}">${(targetUser)}</a> on ${helper.timestampToStandard(e.time)}`;
        } else if (objectType === 'ROLE') {
          text = `Disabled total file access for role <a href="/roles/${e.objectId}">${(targetUser)}</a>`;
        } else if(objectType === 'DEVICE') {
          text = `Total Access Device removed from device ${(deviceName)}`;
        }
        break;

      case 'ROLE_CHANGE':
        if (targetUser === 'ROLE_ADMIN') {
          targetUser = 'a user';
        }

        text = `${(username)} made <a href="/users/${e.objectId}">${(targetUser)}</a> an admin on ${helper.timestampToStandard(e.time)}`;
        break;

      case 'REVOKE':
        text = `${(username)} disabled the user <a href="/users/${e.objectId}">${(e.actionInfo)}</a> on ${helper.timestampToStandard(e.time)}`;
        break;

      case 'UPDATE':
        if(objectType === 'POLICY') {
          text = `${(username)} updated the policy <a href="/policies/${e.objectId}">${(e.actionInfo)}</a> on ${helper.timestampToStandard(e.time)}`;
        } else if(objectType === 'TENANT_SETTINGS') {
          text = `${(username)}  changed tenant setting(s) ${settings} on ${helper.timestampToStandard(e.time)}`;
        } else if (objectType === 'NODE') {
          text = '<a href="/connectors">' + role + ` Connector` + `</a> ${(targetUser)} updated to version `
          + genericInfo.version + ` on ${helper.timestampToStandard(e.time)}`;
        }
        break;
      case 'UP':
        if (objectType === 'NODE') {
          text = '<a href="/connectors">' + role + ` Connector` + `</a> ${(targetUser)} is up on ${helper.timestampToStandard(e.time)}`;
        }
        break;
      case 'DOWN':
        if (objectType === 'NODE') {
          text = '<a href="/connectors">' + role + ` Connector` + `</a> ${(targetUser)} is down on ${helper.timestampToStandard(e.time)}`;
        }
        break;
      case 'NEW':
        if (objectType === 'NODE') {
          text = '<a href="/connectors">' + role + ` Connector` + `</a> ${(targetUser)} added on ${helper.timestampToStandard(e.time)}`;
        }
        break;
      case 'VIB_CONTENT_NOT_FOUND':
        if (result === 'FAIL') {
          text = `${e.service} unable to find email on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'DISK':
        if (result === 'FAIL') {
          text = `${e.ip} disk space went low on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'ES':
        if (result === 'FAIL') {
          text = `Elasticsearch went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'ISPN':
        if (result === 'FAIL') {
          text = `ISPN went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'PORTAL':
        if (result === 'FAIL') {
          text = `Portal went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'REDIS':
        if (result === 'FAIL') {
          text = `Redis went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'RIAK':
        if (result === 'FAIL') {
          text = `Riak went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'SERVER':
        if (result === 'FAIL') {
          text = `Server went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'SOLR':
        if (result === 'FAIL') {
          text = `Solr went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'TOMCAT':
        if (result === 'FAIL') {
          text = `Tomcat went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'JAMES':
        if (result === 'FAIL') {
          text = `James went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'JAMES_QUEUE':
          text = `${eventStrings[e.action + '_' + result ]} on ${helper.timestampToStandard(e.time)}`;
      break;
      case 'MAIL_SERVER':
        if (result === 'FAIL') {
          text = `Email server went down on ${helper.timestampToStandard(e.time)}`;
        }
      break;
      case 'RPM_SERVER':
          if (result === 'FAIL') {
            text = `Unable to connect to Vera RPM server on ${helper.timestampToStandard(e.time)}`;
          }
        break;
    }

    return {
      text: text,
    };
    
  });
  return allEvents;
}