import math
import json
from generatefunctions import calcbigpower
import sys

sys.setrecursionlimit(10000)

def dechiffrer(c,delta,ski,n2):
    pow = 2*delta*ski
    ci = calcbigpower(c,pow,n2)
    return ci
