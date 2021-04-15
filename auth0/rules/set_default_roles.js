function setRolesToUser(user, context, callback) {
  user.app_metadata = user.app_metadata || {};

  function setRolesToTokens() {
    context.idToken['https://moove.ai/roles'] = user.app_metadata.roles;
    context.accessToken['https://moove.ai/roles'] = user.app_metadata.roles;
    callback(null, user, context);
  }

  if (user.app_metadata.roles) {
    setRolesToTokens();
  } else {
    const roles = ['USER'];
    user.app_metadata.roles = roles;
    auth0.users
      .updateAppMetadata(user.user_id, user.app_metadata)
      .then(setRolesToTokens)
      .catch(function (err) {
        callback(err);
      });
  }
}