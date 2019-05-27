const verifier = require("google-id-token-verifier");

// ID token from client.
var IdToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkODg3ZjI2Y2UzMjU3N2M0YjVhOGExZTFhNTJlMTlkMzAxZjgxODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxNjAzNzg4NTE0NjItMmkxMnAwcm" +
  "pwdDcxZHU2Y2cxZWlnNmoyNmdwNW1jZ3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxNjAzNzg4NTE0NjItMmkxMnAwcmpwdDcxZHU2Y2cxZWlnNmoyNmdwNW1jZ3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiI" +
  "xMTY4NDQ2OTA2NjkxNDY2MTg1MTkiLCJhdF9oYXNoIjoiOEFoUnYyUEF6aGdaUlUyWGVqc2ZGQSIsIm5hbWUiOiJNYXRldXN6IERvbWHFhHNraSIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLTMta1hMaVV5Zmhn" +
  "L0FBQUFBQUFBQUFJL0FBQUFBQUFBQUpVL3h1WVlqamJZUHNRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJNYXRldXN6IiwiZmFtaWx5X25hbWUiOiJEb21hxYRza2kiLCJsb2NhbGUiOiJwbCIsImlhdCI6MTU1NjkxMzc2MSwiZXhwIjoxN" +
  "TU2OTE3MzYxfQ.p5MzHtPP96btJyT54z3b-JNaswYKymEBApdYU8StLn4MO5z5C3mh2kwqQVtcDUVNhw0L2H5IR19jnKa8Amg6Ca7JrnmuKvWqYPw9XyRqcQxtYlz4s363TQD-DwIMSDMVKb-6HliIxCAZMpQMdk8aCiydqS8jE1kHMLKwCvplVckFPfI" +
  "5Lg70d0rewQlLFLELzfdJo9cReORmttgO8yTUx124tihBJssj11T-CIDa4lZv8HlxLjrDNXuJ9D249H3MkIOlg3h-eKZsoCo56s1RLswhxknV9Z7_wZLVUF_QXjc1XKNmTHJuS01PVyn9_T0imA69uUV7e8NMPBwotqQcOA";

var clientId =
  "160378851462-2i12p0rjpt71du6cg1eig6j26gp5mcgq.apps.googleusercontent.com";

verifier.verify(IdToken, clientId, function(err, tokenInfo) {
  if (!err) {
    // use tokenInfo in here.
    console.log(tokenInfo);
  } else {
    console.log(err);
  }
});
