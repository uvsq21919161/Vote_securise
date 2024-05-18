import sys
import json

n2 = int(sys.argv[1])

l_votes = []

for i in range(2,len(sys.argv)):
  l_votes.append(int(sys.argv[i]))

res = 1
for vote in l_votes:
  res = (res * vote) % n2
print(json.dumps({"c_final":str(res)}))