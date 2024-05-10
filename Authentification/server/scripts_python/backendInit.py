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
print(json.dumps({"nbserv":str(nb_serv),"t":str(data["t"]),"candidats":str(candidats),
            "delta":str(delta),"p":str(data["p"]),"q":str(data["q"]),
            "p_prim":str(data["p_prim"]),"q_prim":str(data["q_prim"]),
            "n":str(data["n"]),"m":str(data["m"]),"beta":str(data["beta"]),
            "g":str(data["g"]),"betam":str(data["betam"]),
            "liste_ski":data["liste_ski"]}))