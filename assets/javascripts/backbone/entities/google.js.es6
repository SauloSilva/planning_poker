PlanningPoker.module('Entities', (Entities, App) => {
    class GoogleInfo extends Backbone.Model {
        url() {
            return 'https://www.googleapis.com/oauth2/v2/userinfo'
        }

        save() {
            _.each(this.attributes, (value, key) => {
                $.cookie(key, value);
            })
        }
    }

    let API = {
        getGoogleInfo() {
            let googleInfo = new Entities.GoogleInfo();
            googleInfo.fetch({ beforeSend: this.sendAuthentication })

            return googleInfo;
        },

        sendAuthentication(xhr) {
            xhr.setRequestHeader('Authorization', `${ getHashParams()['token_type'] } ${ getHashParams()['access_token'] }`);
        }
    };

    App.reqres.setHandler('google:info:entity', () => {
        return API.getGoogleInfo()
    });

    Entities.GoogleInfo = GoogleInfo;
})
