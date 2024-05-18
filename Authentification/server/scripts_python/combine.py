import sys

sys.setrecursionlimit(1000000)

def usoj(delta,j,nbserv):
    restop = 1
    resbottom = 1
    for i in range(1,nbserv+1):
        if i!=j:
            restop = restop * (-i)
            resbottom = resbottom * (j-i)
    res = restop/resbottom            
    res = res * delta
    return int(res)

def lfunc(u,n):
    return (u-1)//n

def decrypt(s,delta,teta,n,nbserv,c=0):
    t = n**2
    res = 1
    for i in range(len(s)):
        pui = 2*usoj(delta,i+1,nbserv)
        inter = pow(s[i],pui,t)
        res = res * inter % t
    p1 = lfunc(res,n)
    p2 = pow(4*teta*(delta**2),-1,n)
    m = (p1*p2)%n
    return m