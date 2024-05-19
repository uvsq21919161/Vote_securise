import json

from generatefunctions import generateZn, calcbigpower

import sys

sys.setrecursionlimit(4096)

def chiffrer(g,n,m,candidat):
    x = generateZn(n)

    t = n**2
    gm = calcbigpower(g,m,t)
    xn = calcbigpower(x,n,t)
    c = (gm*xn)%t
    
    return c

