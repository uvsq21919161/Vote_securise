def getFinalCrypt(l_votes,n2):
  res = 1
  for vote in l_votes.keys():
    res = (res * l_votes[vote]) % n2
  return res