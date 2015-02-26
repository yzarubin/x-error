x-error
=======
Better JavaScript errors

xError extends javascript `Error`(s) and make them very useful in node applications.

# Usage
xError needs to be used with the `new` constructor, as a classic vanilla `Error`
```javascript
new xError(400, 'validation error', { message: 'field is missing' });
// or you can use jquery-esque syntax via setters
new xError().extend({ message: 'field is missing' }).setHttpCode(400).setMsg('validation error');
```

# API listing

| method                   | shortName      |
| ------------------------ | -------------- |
| `xError.setCode`         | `xError.c`     |
| `xError.setMsg`          | `xError.m`     |
| `xError.setSeverity`     | `xError.s`     |
| `xError.setHttpCode`     | `xError.hc`    |
| `xError.setHttpResponse` | `xError.hr`    |
| `xError.extend`          | `xError.ex`    |
| `xError.debug`           | not available  |

# License
Standard MIT License.
