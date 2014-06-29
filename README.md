VDR webfrontend
===============

Another webfrontend for The Video Disk Recorder. This time a
single page java script application. This has been done
out of personal needs and as usual: just for fun.

Javascript libraries
--------------------

- [AngularJS](https://angularjs.org)
  - MVC application model
- [AngularJS translate](http://angular-translate.github.io)
  - Client-side multilanguage support
- [Semantic UI](http://semantic-ui.com)
  - UI styling
- [JQuery](http://jquery.com)
  - required by Semantic UI and polishes some
    of our custom AngularJS directives


Dependencies
------------

- [VDR](http://www.tvdr.de)
- [VDR restfulapi plugin](https://github.com/yavdr/vdr-plugin-restfulapi)
- a web server


Configuration
-------------

The configuration is done with file conf.json found in the root directory
of the application. The only thing that is required is to point it to the
REST webservice. An example as follows:

```json
{
        "API": "http://localhost:8002/",
        "timer": {
                "margin": {
                        "before": 5,
                        "after": 5
                }
        }
}
```

The examples above required to open the port 8002 as well for the clients
to access the REST service.

Another option is to configure the web service as proxy. As an example a
lighttpd configuration is shown for reference.


```
server.modules   += ( "mod_proxy", "mod_rewrite" )

$HTTP["url"] =~ "^/vdr/restfulapi/" {
  proxy.server = ( "" =>
                   ( "vdr-restfulapi:80" =>
                     (
                       "host" => "127.0.0.1",
                       "port" => 82
                     )
                   )
                 )
}

# URL Rewriting
$SERVER["socket"] == ":82" {
  url.rewrite-once = ( "^/vdr/restfulapi/(.*)$" => "/$1" )
  proxy.server  = ( "" => (
    "vdr-restfulapi:82" => # name
      ( "host" => "127.0.0.1", # Set the IP address of servername
        "port" => 8002
      )
    )
  )
}
```

This assumes that lighttpd hosts the webpage at http://[host]/vdr. The
REST interface is then available under http://[host]/vdr/restfulapi.
The configuration should reflect this with:

```json
{
        "API": "restfulapi/",
        "timer": {
                "margin": {
                        "before": 5,
                        "after": 5
                }
        }
}
```
