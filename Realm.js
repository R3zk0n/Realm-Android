'use strict;'

function modulus(x, n) {
    return ((x % n) + n) % n;
}
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) { hex.push(((bytes[i] >>> 4) & 0xF).toString(16).toUpperCase());
        hex.push((bytes[i] & 0xF).toString(16).toUpperCase());

    }
    return hex.join("");
}

function b2s(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        result += String.fromCharCode(modulus(array[i], 256));
    }
    return result;
}

if (Java.available) {
    Java.perform(function() {

      //Realm stuff
      var RealmHook = Java.use("io.realm.Realm");
      var RealmConfig = Java.use("io.realm.RealmConfiguration")
      const Cipher = Java.use('javax.crypto.Cipher');
      var SecretKey = Java.use("javax.crypto.spec.SecretKeySpec");
        Java.choose("io.realm.Realm", {
            onMatch: function(instance)
            {

                console.log("[=====================] Opened Database")
            },
            onComplete: function(instance)
            { // This hpooks the cache.

              //RealmHook.$init.overload('io.realm.RealmCache').implementation = function(args1){

              RealmConfig.$init.overload('java.io.File', 'java.lang.String', 'java.lang.String', 'java.lang.String', '[B', 'long', 'io.realm.RealmMigration', 'boolean', 'io.realm.internal.OsRealmConfig$Durability', 'io.realm.internal.RealmProxyMediator', 'io.realm.rx.RxObservableFactory', 'io.realm.Realm$Transaction', 'boolean', 'io.realm.CompactOnLaunchCallback', 'boolean').implementation = function(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
                  console.log("Location: ", arg1)
                  console.log("Realm Database: ", arg2)
                  if(arg5.length == null){
                    console.log("")
                } else {
                  console.log("Encryption Key - No Bytes", JSON.stringify(arg5))
                }

                  console.log("Length of key: ", arg5.length + "\nKey(Decrypt): ", bytesToHex(arg5))
                  console.log("Build", arg6)
                  var returnvalue = this.$init(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15)
                  return returnvalue
              }

              console.log("Closed Database")

            }
        })

    }
)}
