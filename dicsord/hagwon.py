from typing import List

theInput = [-1,0,1,-4,2,2,1,1,-2,6,6,-12,2,1,-3]

def threeSum(nums: List[int]) -> List[List[int]]:
    nums.sort()
    outputList = []
    for i in range(len(nums)):
        if i > 0 and nums[i] == nums[i-1]: 
            continue
        indexLeft = i+1
        indexRight = len(nums)-1
        
        while indexLeft < indexRight:
            totalSum = nums[i] + nums[indexRight] + nums[indexLeft]
            
            if totalSum == 0:
                outputList.append([nums[i] , nums[indexRight] , nums[indexLeft]])
                
                while indexLeft < indexRight and nums[indexLeft] == nums[indexLeft+1]:
                    indexLeft += 1
                while indexLeft < indexRight and nums[indexRight] == nums[indexRight-1]:
                    indexRight -= 1

                indexLeft += 1
                indexRight -= 1

            elif totalSum < 0:
                indexLeft +=1
            else:
                indexRight -= 1
    return outputList    
                
print(threeSum(theInput))
