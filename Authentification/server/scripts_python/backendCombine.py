from combine import decrypt
import json
import sys

nb_serv = int(sys.argv[1])
delta = int(sys.argv[2])
teta = int(sys.argv[3])
n = int(sys.argv[4])
liste_ci = []

for i in range(5, len(sys.argv)):
    liste_ci.append(int(sys.argv[i]))

m,p1,p2 = decrypt(liste_ci,delta,teta,n,nb_serv)
print(json.dumps({"m":str(m)}))

