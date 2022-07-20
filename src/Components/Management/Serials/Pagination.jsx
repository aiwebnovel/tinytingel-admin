import { Flex, Tooltip, Text, IconButton, useToast} from '@chakra-ui/react';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon} from '@chakra-ui/icons';

const Pagination = ({currentPage, setCurrent, total}) => {
    const toast = useToast();
    const numPages = Math.ceil(total / 50);

    return(
        <Flex m={4} alignItems="center" justifyContent="center">
        <Flex justifyContent="space-between">
          <Tooltip label="First Page">
            <IconButton
              size="sm"
              onClick={() => {
                if (currentPage === 1) {
                  toast({
                    title: '맨 처음 페이지',
                    description: '맨 처음 페이지에요!',
                    position: 'top-right',
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                  });
                }
                setCurrent(1);
              }}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>

          <IconButton
            size="sm"
            onClick={() => {
              setCurrent(currentPage - 1);
            }}
            isDisabled={currentPage === 1 && true}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Flex>

        <Flex alignItems="center" flexShrink="0" ml={5} mr={5}>
          <Text>
            <Text fontWeight="bold" as="span">
              {currentPage}
            </Text>{' '}
            of{' '}
            <Text fontWeight="bold" as="span">
              {numPages}
            </Text>
          </Text>
        </Flex>

        <Flex>
          <IconButton
            size="sm"
            onClick={() => {
              setCurrent(currentPage + 1);
            }}
            isDisabled={currentPage === numPages && true}
            icon={<ChevronRightIcon h={6} w={6} />}
          />

          <Tooltip label="Last Page">
            <IconButton
              size="sm"
              onClick={() => {
                if (currentPage === numPages) {
                  toast({
                    title: '마지막 페이지',
                    description: '마지막 페이지에요!',
                    position: 'top-right',
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                  });
                }
                setCurrent(numPages);
              }}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    )
}

export default Pagination;