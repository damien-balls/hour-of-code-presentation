from typing import List

nums = [1,2,0,0,3,5,1,6,3,0]

def moveZeroes(nums: List[int]) -> None:
    index = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[index], nums[i] = nums[i], nums[index]
            index += 1
        
moveZeroes(nums = nums)
print(nums)