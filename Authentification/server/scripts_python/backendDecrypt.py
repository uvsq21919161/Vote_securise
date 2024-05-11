import json
import sys
from homomorphe import getFinalCrypt
from dechifrer import dechiffrer

#changer vite fait des trucs ici pck on va mettre le produit des votes direct sur la bdd pour éviter
# de tout recalculer a chaque fois et ca évitera de faire une requette sur TOUS les votes à chaque
# fois

secret_key = int(sys.argv[1])
n = int(sys.argv[2])
n2 = int(sys.argv[3])
candidats = int(sys.argv[4])
delta = int(sys.argv[5])
l_votes_str = sys.argv[6:]

l_votes = [int(vote) for vote in l_votes_str]

'''
Ce fichier est appelé sur les serveurs internes pour qu'ils
effectuent chacun leur déchifrement partiel
'''

resultats_vote = []

liste_ci = []

#we compute the results for each pretender
for i in range(candidats):
    finalc = getFinalCrypt(l_votes[i],n2)
    liste_ci.append(dechiffrer(finalc,delta,secret_key,n2))

print(json.dumps({"ci":liste_ci}))