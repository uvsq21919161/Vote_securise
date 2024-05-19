import sys
import json
from chiffrer import chiffrer

'''
Ce fichier est appelé coté client lorsque le votant chiffre son vote.
'''

m = int(sys.argv[1])
candidats = int(sys.argv[2])
g = int(sys.argv[3])
n = int(sys.argv[4])

'''
Pour chaque candidat, on chiffre 1 si le candidat est celui pour lequel a voté le client,
et 0 sinon.
'''
l_votes = []
for j in range(candidats):
  if j == m:
    vote = 1
  else:
    vote = 0
  l_votes.append(str(chiffrer(g,n,vote,j)))

print(json.dumps({"votes":l_votes}))
