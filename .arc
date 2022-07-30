@app
begin-app

@http

@shared
src models

@views
src app

@plugins
enhance/arc-plugin-enhance

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
