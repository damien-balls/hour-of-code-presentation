a = [[1,2,3],[4,5,6,],[7,8,9]]
b = [[1,2,3],[4,5,6,],[7,9,9]]

def mat( matrix1, matrix2):
    if len(a[0]) != len(b):
        print('didnt work')

    rowA  = len(a)
    columnA =  len(a[0])
    columnB = len(b[0])
    matrixC = [[0 for _ in range(a)] for _ in range(b)]

    for i in range(rowA):
        for k in range(columnA):
            for j in range(columnB):
                matrixC[i][j] += a[i][k] * b[j][k]

    return matrixC