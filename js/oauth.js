const KEY  = "AIzaSyAwcApNGn-BeZZh1lPBuoAusRXaKehVhm8"
const CLIENT_ID = "184379824246-a8fogv4bo949eepphis8n2cfsn4os3en.apps.googleusercontent.com"
var GoogleAuth;
    var SCOPE = 'email profile openid';
    function handleClientLoad() {
      // Load the API's client and auth2 modules.
      // Call the initClient function after the modules load.
      gapi.load('client:auth2', initClient);
    }
  
    function initClient() {
      // In practice, your app can retrieve one or more discovery documents.
      var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  
      // Initialize the gapi.client object, which app uses to make API requests.
      // Get API key and client ID from API Console.
      // 'scope' field specifies space-delimited list of access scopes.
      gapi.client.init({
          'apiKey': KEY,
          'clientId': CLIENT_ID,
          'discoveryDocs': [discoveryUrl],
          'scope': SCOPE
      }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
  
        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);
  
        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();
        setSigninStatus();
  
        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.
        $('#sign-in-or-out-button').click(function() {
          handleAuthClick();
        });
        $('#revoke-access-button').click(function() {
          revokeAccess();
        });
      });
    }

     
    function handleAuthClick() {
      if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked "Sign out" button.
        GoogleAuth.signOut();
      } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
      }
    }
  
    function revokeAccess() {
      GoogleAuth.disconnect();
    }
  
    function setSigninStatus() {
      var user = GoogleAuth.currentUser.get();
      var isAuthorized = user.hasGrantedScopes(SCOPE);
      if (isAuthorized) {
        $('#sign-in-or-out-button').html('Log Out');
        $('#revoke-access-button').css('display', 'inline-block');
        $('#auth-status').html('Ya has dado permisos de acceso de Google a esta App');
        $('#continue-access-button').css('display', 'inline-block')
        $('#continue-access-button').click(() => {
          sessionStorage.setItem('user', GoogleAuth?.currentUser?.get()?.Vd?.nt?.Se)
          let date = new Date();
          sessionStorage.setItem('logInDate', date.toLocaleString());
          window.location.href = "./home.html"
      })
     } else {
        $('#sign-in-or-out-button').html('Ingresar/Authorización con Google');
        $('#revoke-access-button').css('display', 'none');
        $('#auth-status').html('No has autorizado a esta App o estas desconectado');
        $('#continue-access-button').css('display', 'none')
      }
    }
  
    function updateSigninStatus() {
      setSigninStatus();
    }