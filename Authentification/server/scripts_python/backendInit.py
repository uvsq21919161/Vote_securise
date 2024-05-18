import sys
import math
from generatefunctions import generate, init_votant
import json

"""
Ce programme va intialiser tout ce dont on aura besoin par la suite
"""

sys.setrecursionlimit(10000)

if len(sys.argv) == 4:
  nb_serv = int(sys.argv[1])
  t = int(sys.argv[2])
  candidats = int(sys.argv[3])

else:
  nb_serv = int(sys.argv[1])
  t = nb_serv -1
  candidats = int(sys.argv[2])
  
delta = math.factorial(nb_serv)

#ci dessous, on génère tous ce dont on aura besoin par la suite pour chiffrer, déchiffrer avec
# les clé secrètes partagées et combiner le résultat final

data = generate(nb_serv,t,delta)
print(json.dumps({"nbserv":str(nb_serv),"n2":str(data["t"]),
            "candidats":str(candidats),
            "delta":str(delta),
            "n":str(data["n"]),
            "g":str(data["g"]),
            "liste_ski":data["liste_ski"],
            "teta": str(data["teta"]),
            "p": str(data["p"]),
            "q": str(data["q"]),
            "a": str(data["a"]),
            "beta": str(data["beta"]),
            "m": str(data["m"])}))