from combine import decrypt
import json
import sys

candidats = int(sys.argv[1])
nb_serv = int(sys.argv[2])
delta = int(sys.argv[3])
teta = int(sys.argv[4])
n = int(sys.argv[5])
liste_ci = []

for i in range(6, len(sys.argv)):
    liste_ci.append(int(sys.argv[i]))

m = decrypt(liste_ci,delta,teta,n,nb_serv)
print(json.dumps({"res":m}))

